import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import SearchExample from './panels/HeaderSearch'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
        //connect.send("VKWebAppGetAuthToken", {"app_id": 6705754, "scope": "groups,wall,"});

    }

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<SearchExample id="info" go={this.go} />
				{/*<HeaderSearch id="search" go={this.go}/>*/}
			</View>
		);
	}
}

export default App;
