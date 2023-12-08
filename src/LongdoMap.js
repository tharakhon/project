import React, { Component } from 'react';

export let longdo;
export let map;

export class LongdoMap extends Component {

    constructor(props) {
        super(props);
        this.mapCallback = this.mapCallback.bind(this);
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
                    placeholder: document.getElementById('map'),
                    ui: longdo.UiComponent.Mobile
                  });
                // Obtain the search element after the script has loaded
                var search = document.getElementById('search');

                if (search) {
                    // Initialize search functionality once the map is available
                    map.Search.placeholder(
                        document.getElementById('result')
                    );

                    // When user presses an Enter button #search
                    search.onkeyup = function (event) {
                        if ((event || window.event).keyCode != 13)
                            return;
                        doSearch();
                    };
                    var suggest = document.getElementById('suggest');
                    search.oninput = function() {
                        if (search.value.length < 3) {
                          suggest.style.display = 'none';
                          return;
                        }
                        
                        map.Search.suggest(search.value, {
                            area: 10
                          });
                      };
                      map.Event.bind('suggest', function(result) {
                        if (result.meta.keyword != search.value) return;
                        
                        suggest.innerHTML = '';
                        for (var i = 0, item; item = result.data[i]; ++i) {
                          longdo.Util.append(suggest, 'a', {
                            innerHTML: item.d,
                            href: 'javascript:doSuggest(\'' + item.w + '\')'
                          });
                        }
                        suggest.style.display = 'block';
                      });

                    function doSearch() {
                        map.Search.search(search.value, {
                            area: 10
                          });
                        // Check if map object is available before accessing its Search property
                        var suggest = document.getElementById('suggest');  // <-- Obtain the reference
                        if (suggest) {
                            suggest.style.display = 'flex';
                        } else {
                            console.error("Suggest element not found in the DOM.");
                        }
                    }
                    function doSuggest(value) {
                        search.value = value;
                        doSearch();
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

    render() {
        return (
            <div >
                <div id={this.props.id} style={{ width: '100ch', height: '50ch' }}></div>
                <div >
                    <input id="search"></input>
                    <div id="suggest" ></div>
                    <div id="result" ></div>
                </div>
            </div>
        );
    }
}