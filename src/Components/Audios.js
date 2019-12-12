import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import Wavesurf from './Wavesurf';

class Audios extends Component {
	state = {
		audios: [],
		activePage: 1,
		total: 0,
	};

	async updateTotal() {
		const { total } = await this.fetchTotal();
		if (total > 0) {
			this.setState({ total });
		}
	}

	async fetchTotal() {
		const total = await fetch('http://localhost:5000/total');
		return await total.json();
	}

	async fetchData(pageNumber) {
		const items = await fetch(`http://localhost:5000/${pageNumber}`);
		return items.json();
	}

	async pageChange(pageNumber) {
		const audios = await this.fetchData(pageNumber);
		if (audios.length > 0) {
			this.setState({
				activePage: pageNumber,
				audios,
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
						<Wavesurf
							meta={item}
							src={'http://localhost:5000/audio/' + item.name}
						/>
					</article>
				))}
				<div className="pagination">
					<Pagination
						activePage={activePage}
						itemsCountPerPage={10}
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
