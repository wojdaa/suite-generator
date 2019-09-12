import React, {Component} from "react";
import {saveAs} from "file-saver";
import SearchTests from "../../containers/search/SearchTests";
import TestsList from "../../containers/sidebars/TestsList";
import LoadSuiteButton from "../../containers/buttons/LoadSuiteButton";
import SuiteActionButton from "../../containers/buttons/SuiteActionButton";

class SidebarTests extends Component {

  runSuiteOnAet(file) {
    alert("SENDING TO AET")
  }

  render () {
    return (
      <div className="sidebar-tests">
        <SearchTests />
        <TestsList />
        <SuiteActionButton label="RUN SUITE, RUN!" handleFile={this.runSuiteOnAet} />
        <SuiteActionButton label="DOWNLOAD SUITE" handleFile={saveAs}/>
        <LoadSuiteButton />
      </div>
    )
  }
}

export default SidebarTests;