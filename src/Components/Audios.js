import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import * as env from '../enviroment';
import Wavesurf from './Wavesurf';

const { URL_SITE, ITEM_COUNT } = env[process.env.NODE_ENV];
const ITEM_PER_PAGE = parseInt(ITEM_COUNT);

class Audios extends Component {
	state = {
		audios: [],
		activePage: 1,
		total: 0,
	};

	async fetchTotal() {
		const result = await fetch(URL_SITE + '/total');
		return await result.json();
	}

	async updateTotal() {
		const { data, success } = await this.fetchTotal();
		const { total } = data;
		if (success && total > 0) {
			this.setState({ total });
		}
	}

	async fetchData(pageNumber) {
		const items = await fetch(
			`${URL_SITE}/page?pag=${pageNumber}&items=${ITEM_PER_PAGE}`
		);
		return items.json();
	}

	async pageChange(pageNumber) {
		const { data, success } = await this.fetchData(pageNumber);
		if (success && data.audios.length > 0) {
			this.setState({
				activePage: pageNumber,
				audios: data.audios,
			});
		} else {
			this.setState({ activePage: pageNumber });
		}
	}

	handlePageChange(pageNumber) {
		this.pageChange(pageNumber);
	}

	componentDidMount() {
		try {
			this.updateTotal();
			this.handlePageChange(1);
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { audios, activePage, total } = this.state;
		return (
			<main>
				{audios.map(item => (
					<article className="article" key={item.name}>
						<Wavesurf meta={item} src={`${URL_SITE}/audio/${item.name}`} />
					</article>
				))}
				<div className="pagination">
					<Pagination
						activePage={activePage}
						itemsCountPerPage={ITEM_PER_PAGE}
						totalItemsCount={total}
						pageRangeDisplayed={10}
						itemClass="page-item"
						linkClass="page-link"
						onChange={this.handlePageChange.bind(this)}
					/>
				</div>
			</main>
		);
	}
}

export default Audios;
