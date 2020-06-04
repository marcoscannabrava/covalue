import React, { Component } from 'react'
import Spinner from '../../shared/Spinner';

// import axios from 'axios';

export class Financials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false, // [TO-DO] set to true when implementing URL fetch
      records: [],
      fetchError: null
    };
  }

  componentDidMount() { // [TO-DO] Fetch URL to embed Google Spreadsheet

    // axios.get("/api/dre")
    // .then(res => {
    //   console.log('server response: ', res);
    //   this.setState({records: res.data.records, loader: false});
    // }).catch((error) => {
    //   if (error.response) {
    //     // Request made. Server responded with an error status code.
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     this.setState({fetchError: error});
    //   } else if (error.request) {
    //     // Request made. No response from server
    //     console.log(error.request);
    //     this.setState({fetchError: error});
    //   }
    //   this.setState({loader: false});
    // })
  }

  render() {
    if (this.state.loader) {
      return <Spinner />
    } else if (this.state.fetchError !== null) {
      return (
        <div className="card card-statistics">
          <div className="card-body">
            <h3 className="font-weight-medium text-right mb-0 text-dark">
              Sorry.
              {!!this.state.fetchError.request ? 
              " The server didn't respond." : " The server responded with an error."}
            </h3>
          </div>
        </div>
      )
    } else {
    return (
      <div className="card card-embed-table">
        <iframe className="embed-table" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRXYgmgevyAK6dL62_BmgRDQhhg-veVfFe2DKqZH7de-04riiGp3sdRaqsTTEbRsJj0DNyT63iOeMb9/pubhtml?widget=true&amp;headers=false"></iframe>
      </div>
    )}
  }
}

export default Financials
