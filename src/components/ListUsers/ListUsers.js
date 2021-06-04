import {Component} from 'react';
import axios from "axios";
import {TextField} from "@material-ui/core";
import {UserDetail} from "../UserDetail/UserDetail";

export class ListUsers extends Component {

    github = axios.create({
        baseURL: 'https://api.github.com/',
    });

    constructor(props) {
        super(props);
        this.state = {results: [], selected: null};

        if (process.env.TOKEN) {
            this.github.defaults.headers.common.Authorization = `{token ${process.env.TOKEN}`;
        }
        this.handleClick = this.handleClick.bind(this);
    }

    updateData(results) {
        this.setState({
            results: results
        });
    }

    searchUsers(q: string): Promise<*> {
        let self = this;
        return this.github
            .get('/search/users', {
                params: {
                    q: q
                }
            })
            .then(function (response) {
                self.updateData(response.data.items);
            });
    }

    handleClick(d) {
        this.setState({
            selected: d
        });
        console.log(d);
    }

    render() {
        if(this.state.selected){
            return <UserDetail user={this.state.selected}/>;
        }
        return (
            <div>
                <TextField id="standard-basic" label="Buscar usuario"
                           onChange={(e) => this.searchUsers(e.target.value)}/>
                <div className={'list'}>
                    {this.state.results.map(d => <li key={d.id}
                                                     onClick={() => this.handleClick(d)}>{d.login}</li>)}
                </div>
            </div>
        );
    }
}