import React, {Component} from "react";
import {saveAs} from "file-saver";
import ScrollToBottom from "react-scroll-to-bottom";
import SearchTests from "../../containers/search/SearchTests";
import TestsList from "../../containers/sidebars/TestsList";
import LoadSuiteButton from "../../containers/buttons/LoadSuiteButton";
import SuiteActionButton from "../../containers/buttons/SuiteActionButton";
import Modal from "../overlay/Modal";
import StatusUpdate from "../../containers/reports/StatusUpdate";
import LinkButton from "../../containers/buttons/LinkButton";
import axios from 'axios';

class SidebarTests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      aetRunning: false,
      aetFinished: false,
      aetSuccess: false,
      reportUrl: null,
      errorCaught: false
    };

    this.runSuiteOnAet = this.runSuiteOnAet.bind(this);
    this.hideAetModal = this.hideAetModal.bind(this);
  }

  runSuiteOnAet(file) {
    this.startAet();
    const data = new FormData();
    data.append("suite", file);
    data.append("name", file.name);
    axios.post('http://35.157.217.31/suite', data)
    .then(response => {
      this.setReportUrl(response.data.htmlReportUrl);
      const interval = setInterval(() => {
        axios.get('http://35.157.217.31' + response.data.statusUrl)
        .then(response => {
          const status = response.data.status;
          if (status === "FINISHED" || status === "FATAL") {
            clearInterval(interval);
          }
          if (status !== "UNKNOWN") {
            this.addNewStatus(response.data);
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            errorCaught: true,
            aetFinished: true
          });
        })
      }, 1000);

    })
    .catch(e => {
      console.log(e);
      this.setState({
        errorCaught: true,
        aetFinished: true
      });
    });
  }

  startAet() {
    this.setState({
      aetRunning: true
    });
  }

  hideAetModal() {
    this.setState({
      aetRunning: false,
      reportUrl: null,
      aetFinished: false,
      aetSuccess: false,
      statuses: []
    });
  }

  setReportUrl(url) {
    console.log(url);
    this.setState({
      reportUrl: url
    });
  }

  addNewStatus(update) {
    this.state.statuses.push(update);

    if (update.status === "FINISHED") {
      this.setState({
        statuses: this.state.statuses,
        aetFinished: true,
        aetSuccess: true
      });
    } else if (update.status === "FATAL") {
      this.setState({
        statuses: this.state.statuses,
        aetFinished: true
      });
    } else {
      this.setState({
        statuses: this.state.statuses
      });
    }
  }

  render () {
    return (
      <div className="sidebar-tests">
        <SearchTests />
        <TestsList />
        <SuiteActionButton label="RUN SUITE" handleFile={this.runSuiteOnAet} />
        <SuiteActionButton label="DOWNLOAD SUITE" handleFile={saveAs}/>
        <LoadSuiteButton />

        {this.state.aetRunning &&
          <Modal>
            <ScrollToBottom className="scroll">
              {this.state.errorCaught 
                ? <StatusUpdate message="Something went wrong. Perhabs AET's are running, try again later." status="fatal" />
                : 
                <React.Fragment>
                  {this.state.statuses.map((update, i) => <StatusUpdate key={i} message={update.message} status={update.status} /> )}
                  {!this.state.aetFinished && <StatusUpdate message="Processing..." status="placeholder" />}
                </React.Fragment>
              }
             
              <div className="overlay-btn-container">
                {this.state.aetSuccess && <LinkButton className="modal-btn" url={this.state.reportUrl} label="Show report"></LinkButton>}
                {this.state.aetFinished && <button className="modal-btn" onClick={this.hideAetModal}>Close</button>}
              </div>
            </ScrollToBottom>
          </Modal>
        }
      </div>
    )
  }
}

export default SidebarTests;