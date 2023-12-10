import React, { Component } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export let longdo;
export let map;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '58ch',
        },
    },
}));
export class LongdoMap extends Component {

    constructor(props) {
        super(props);
        this.mapCallback = this.mapCallback.bind(this);
        this.suggest = null;  // Declare suggest in the constructor
    }

    mapCallback() {
        if (window.longdo) {
            longdo = window.longdo;
            map = new window.longdo.Map({
                placeholder: document.getElementById(this.props.id),
                language: 'th'
            });
        } else {
            console.error("Longdo API is not available.");
        }
    }

    componentDidMount() {
        const existingScript = document.getElementById('longdoMapScript');
        const callback = this.props.callback;

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://api.longdo.com/map/?key=${this.props.mapKey}`;
            script.id = 'longdoMapScript';
            document.body.appendChild(script);

            script.onload = () => {
                this.mapCallback();
                if (callback) callback();
                map = new longdo.Map({
                    placeholder: document.getElementById(this.props.id),
                    ui: longdo.UiComponent.Mobile
                });

                var search = document.getElementById('search');

                if (search) {
                    map.Search.placeholder(
                        document.getElementById('result')
                    );

                    search.onkeyup = function (event) {
                        if ((event || window.event).keyCode !== 13)
                            return;
                        doSearch();
                    };

                    this.suggest = document.getElementById('suggest');  // Assign suggest to the class variable

                    search.oninput = () => {
                        if (search.value.length < 3) {
                            this.suggest.style.display = 'flex';
                            return;
                        }

                        map.Search.suggest(search.value, {
                            area: 0
                        });
                    };

                    map.Event.bind('suggest', (result) => {
                        if (result.meta.keyword !== search.value) return;

                        this.suggest.innerHTML = '';
                        for (let i = 0, item; item = result.data[i]; ++i) {
                            longdo.Util.append(this.suggest, 'a', {
                                innerHTML: item.d,
                                href: 'javascript:void(0)',  // Use void(0) instead of calling a function directly in href
                                onclick: () => this.doSuggest(item.w)  // Use a class method
                            });
                        }
                        this.suggest.style.display = 'flex';
                    });

                    function doSearch() {
                        map.Search.search(search.value, {
                            area: 0
                        }, (result) => {
                            if (result.length > 0) {
                                const location = result[0].location;
                                const marker = new longdo.Marker(location, {
                                    title: search.value,
                                    detail: result[0].name,
                                    icon: {
                                        url: 'path/to/marker-icon.png',
                                        offset: { x: 12, y: 45 }
                                    }
                                });
                                map.Overlays.add(marker);

                                map.zoom(15);
                                map.location(location, true);
                            } else {
                                console.error("No search results found.");
                            }

                            if (this.suggest) {
                                this.suggest.style.display = 'flex';
                            } else {
                                console.error("Suggest element not found in the DOM.");
                            }
                        });
                    }
                } else {
                    console.error("Search element not found in the DOM.");
                }
            };
        }

        if (existingScript && window.longdo) {
            this.mapCallback();
            if (callback) callback();
        }
    }

    // Define doSuggest as a class method
    doSuggest(value) {
        const search = document.getElementById('search');
        if (search) {
            search.value = value;
            doSearch();
        } else {
            console.error("Search element not found in the DOM.");
        }

        function doSearch() {
            map.Search.search(search.value, {
                area: 0
            }, (result) => {
                if (result.length > 0) {
                    const location = result[0].location;
                    const marker = new longdo.Marker(location, {
                        title: search.value,
                        detail: result[0].name,
                        icon: {
                            url: 'path/to/marker-icon.png',
                            offset: { x: 12, y: 45 }
                        }
                    });
                    map.Overlays.add(marker);

                    map.zoom(15);
                    map.location(location, true);
                } else {
                    console.error("No search results found.");
                }

                if (this.suggest) {
                    this.suggest.style.display = 'flex';
                } else {
                    console.error("Suggest element not found in the DOM.");
                }
            });
        }
    }

    render() {
        return (
            <div >
                <div style={{ display: 'flex' }}>
                    <div id={this.props.id} style={{ width: '100ch', height: '50ch', justifyContent: 'center' }}>
                    </div>
                    <div style={{ flex: 2 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search Google Maps"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                id="search"
                            />
                        </Search>

                        <div id="suggest" style={{ flexDirection: 'column' }}></div>
                        <div id="result" ></div>
                    </div>

                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { ml: 30,mt:1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="filled-multiline-static"
                        label="ใส่ที่อยู่ของคุณ"
                        multiline
                        rows={10}

                        variant="filled"
                    />
                </Box>
            </div>
        );
    }
}
