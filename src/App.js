import React from 'react';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        }

        this.getReddit = this.getReddit.bind(this);
    }
 
    getReddit = event => {
        console.log("ok event", event);

        this.setState({ searchText: event.target.value });
        axios.get('//reddit.com/r/' + event.target.value + '.json')
        .then(response => {
            console.log("hey response", response.body);
        });
            
        };

    render(){
        return(
            <div>
            <div>Yo World</div>
            <input type="text" placeholder={this.state.searchText} onChange={(e) => this.getReddit(e)}></input>
            </div>
        )
    }
}

export default App;