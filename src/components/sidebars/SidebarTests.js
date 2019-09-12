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

class SidebarTests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      aetRunning: false,
      aetFinished: false,
      aetSuccess: false,
      reportUrl: null
    }

    this.runSuiteOnAet = this.runSuiteOnAet.bind(this);
    this.hideAetModal = this.hideAetModal.bind(this);
  }

  // hardcoded data
  componentDidMount() {
    const array = [
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:11	[Failed to wait for image to be loaded with provided locator. Error: Expected condition failed: waiting for visibility of element located by By.cssSelector: img.shoppable-item-product-image (tried for 3 second(s) with 500 MILLISECONDS interval)", status: "error"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:11	[Failed to wait for image to be loaded with provided locator. Error: Expected condition failed: waiting for visibility of element located by By.cssSelector: img.shoppable-item-product-image (tried for 3 second(s) with 500 MILLISECONDS interval)", status: "error"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:42:12	[14:42:10.573]: COMPARED: [success: 144, total: 144] ::: COLLECTED: [success: 50, total: 60]", status: "progress"},
      {message: "11-Sep-2019 14:43:16	Suite processing finished", status: "finished"},
    ]
    let i = 0;
    const nnn = () => {
      this.addNewStatus(array[i]);
      i ++;
      if (i < array.length) setTimeout(nnn, 1000);
    }

    setTimeout(nnn, 1000);
  }

  runSuiteOnAet(file) {
    this.startAet();
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
    this.setState({
      reportUrl: url
    });
  }

  addNewStatus(update) {
    this.state.statuses.push(update);
    
    if (update.status === "finished") {
      this.setState({
        statuses: this.state.statuses,
        aetFinished: true,
        aetSuccess: true
      });
    } else if (update.status === "fatal") {
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
        <SuiteActionButton label="RUN SUITE, RUN!" handleFile={this.runSuiteOnAet} />
        <SuiteActionButton label="DOWNLOAD SUITE" handleFile={saveAs}/>
        <LoadSuiteButton />

        {this.state.aetRunning && 
          <Modal>
            <ScrollToBottom className="scroll">
              {this.state.statuses.map(update => <StatusUpdate message={update.message} status={update.status} /> )}
              <div class="overlay-btn-container">
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