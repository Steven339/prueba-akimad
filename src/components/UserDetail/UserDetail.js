import axios from "axios";
import {Component} from "react";

export class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            orgs: [],
            user: this.props.user
        }
    }

    searchRepos(url): Promise<*> {
        let self = this;
        return axios.get(url, {
            headers: {
                'authorization': process.env.TOKEN
            }
        })
            .then(function (response) {
                console.log(response.data);
                self.updateRepos(response.data);
            });
    }

    searchOrganizations(url): Promise<*> {
        let self = this;
        return axios.get(url, {
            headers: {
                'authorization': process.env.TOKEN
            }
        })
            .then(function (response) {
                console.log(response.data);
                self.updateOrgs(response.data);
            });
    }

    render() {
        if (this.state.repos.length === 0) {
            this.searchRepos(this.state.user.repos_url);
        }
        if (this.state.orgs.length === 0) {
            this.searchOrganizations(this.state.user.organizations_url);
        }
        return (
            <div>
                <h2>{this.state.user.login}</h2>
                <img src={this.state.user.avatar_url} alt="" width="100px"/>
                <h3>Repositorios</h3>
                <div>
                    {this.state.repos.map(r => <li key={r.id}>{r.name}</li>)}
                </div>
                <h3>Organizaciones</h3>
                <div>
                    {this.state.orgs.map(r => <li key={r.id}>{r.login}</li>)}
                </div>
            </div>
        );
    }

    updateRepos(data) {
        this.setState({
            repos: data
        });
    }

    updateOrgs(data) {
        this.setState({
            orgs: data
        });
    }
}