import axios from "axios";
import React, { Component } from "react";


type State = {
  text: String;
}


const CardList = (props: any) => (
  <div>
    {props.profiles.map((profile: any) => <Card key={profile.id} {...profile} />)}
  </div>
)

class Card extends Component {
  render() {
    const profile = this.props;
    return <div className="">
      <img src={profile.avatar_url} alt="" />
      <div>
        <div>{profile.name}</div>
        <div>{profile.company}</div>
      </div>
    </div>
  }
}

class Form extends Component<State> {
  state = {
    userName: "",
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ userName: e.currentTarget.value });
  };

  // addNewProfile: FormEventHandler<HTMLFormElement> | undefined;

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="enter your github name"
            name="name"
            value={this.state.userName}
            onChange={
              // (event) =>
              // this.setState({ userName: event.target.value })
              this.onChange
            }
          />
          <button>submit</button>
        </form>
      </div>
    );
  }
}


export default class App extends Component {
  state = { 
    profiles: []
  };

  addNewProfile = (profileData:any) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  }

  render() {
    return <div>
      <Form onSubmit={this.addNewProfile} />
      <CardList profile={this.state.profiles} />
    </div>;
  }
}
