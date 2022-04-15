import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faUserSecret, faBraille, faPeopleArrows, faDharmachakra, faClock, faMeteor, faUserAstronaut, faDumpsterFire, faBolt, faBrain, faUserFriends, faSyringe, faHatWizard, faCheck, faMinus, faTimes, faQuestion, faRedo, faVoteYea, faBomb, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { Tag, Button, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { Line } from '@ant-design/charts';

class RoundDataParser {
  constructor() {
    console.log("[RDP] Loading...");
    this.mode_icon_map = {};
    // Key: Mode in the round table \ Value: Formatting for the list
    this.mode_icon_map["abduction"] = (<><FontAwesomeIcon icon={faStreetView} />&nbsp;{"Abduction"}</>);
    this.mode_icon_map["AutoTraitor"] = (<><FontAwesomeIcon icon={faUserSecret} />&nbsp;{"AutoTraitor"}</>);
    this.mode_icon_map["blob"] = (<><FontAwesomeIcon icon={faBraille} />&nbsp;{"Blob"}</>);
    this.mode_icon_map["changeling"] = (<><FontAwesomeIcon icon={faPeopleArrows} />&nbsp;{"Changeling"}</>);
    this.mode_icon_map["cult"] = (<><FontAwesomeIcon icon={faDharmachakra} />&nbsp;{"Cult"}</>);
    this.mode_icon_map["extended"] = (<><FontAwesomeIcon icon={faClock} />&nbsp;{"Extended"}</>);
    this.mode_icon_map["meteor"] = (<><FontAwesomeIcon icon={faMeteor} />&nbsp;{"Meteor"}</>);
    this.mode_icon_map["nuclear emergency"] = (<><FontAwesomeIcon icon={faUserAstronaut} />&nbsp;{"Nuclear Emergency"}</>);
    this.mode_icon_map["ragin' mages"] = (<><FontAwesomeIcon icon={faDumpsterFire} />&nbsp;{"Ragin' Mages"}</>);
    this.mode_icon_map["revolution"] = (<><FontAwesomeIcon icon={faBolt} />&nbsp;{"Revolution"}</>);
    this.mode_icon_map["shadowling"] = (<><FontAwesomeIcon icon={faBrain} />&nbsp;{"Shadowling"}</>);
    this.mode_icon_map["traitor"] = (<><FontAwesomeIcon icon={faUserSecret} />&nbsp;{"Traitor"}</>);
    this.mode_icon_map["traitor+changeling"] = (<><FontAwesomeIcon icon={faUserFriends} />&nbsp;{"Traitor+Changeling"}</>);
    this.mode_icon_map["traitor+vampire"] = (<><FontAwesomeIcon icon={faUserFriends} />&nbsp;{"Traitor+Vampire"}</>);
    this.mode_icon_map["vampire"] = (<><FontAwesomeIcon icon={faSyringe} />&nbsp;{"Vampire"}</>);
    this.mode_icon_map["wizard"] = (<><FontAwesomeIcon icon={faHatWizard} />&nbsp;{"Wizard"}</>);

    // Setup our result map for rounds that have their own handlers
    this.result_string_map = {};

    // Blob
    this.result_string_map["blob"] = {};
    this.result_string_map["blob"]["blob win - blob took over"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - Blob took over"}</Tag>);
    this.result_string_map["blob"]["blob halfwin - nuke"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Station nuked"}</Tag>);
    this.result_string_map["blob"]["blob loss - blob eliminated"] = (<Tag color="green"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Blob eliminated"}</Tag>);

    // Cult
    this.result_string_map["cult"] = {};
    this.result_string_map["cult"]["cult win - cult win"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - God summoned"}</Tag>);
    this.result_string_map["cult"]["cult draw - narsie died, nobody wins"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - God summoned, but banished"}</Tag>);
    this.result_string_map["cult"]["cult loss - staff stopped the cult"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Crew stopped the cult"}</Tag>);

    // Nuclear emergency
    this.result_string_map["nuclear emergency"] = {};
    this.result_string_map["nuclear emergency"]["nuclear win - syndicate nuke"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - Nuke Successful"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear halfwin - syndicate nuke - did not evacuate in time"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Nuke successful - Operatives did not escape in time"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear halfwin - blew wrong station"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Nuked wrong station"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear halfwin - blew wrong station - did not evacuate in time"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Nuked wrong station - Operatives did not escape in time"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear halfwin - detonation averted"] = (<Tag color="red"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Detonation averted"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear halfwin - interrupted"] = (<Tag color="blue"><FontAwesomeIcon icon={faMinus} />&nbsp;{"Half win - Server error!"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear loss - evacuation - disk secured - syndi team dead"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Crew escaped with disk - Syndicates died"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear loss - evacuation - disk secured"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Crew escaped with disk"}</Tag>);
    this.result_string_map["nuclear emergency"]["nuclear loss - evacuation - disk not secured"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Crew escaped without disk"}</Tag>);

    // Ragin + Wizard
    let wizard_dict = {};
    wizard_dict["wizard loss - wizard killed"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Wizard killed"}</Tag>);
    wizard_dict["undefined"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - Wizard wins"}</Tag>);
    this.result_string_map["ragin' mages"] = wizard_dict;
    this.result_string_map["wizard"] = wizard_dict;

    // Revolution
    this.result_string_map["revolution"] = {};
    this.result_string_map["revolution"]["revolution win - heads killed"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - Heads killed"}</Tag>);
    this.result_string_map["revolution"]["revolution loss - rev heads killed"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Revheads killed"}</Tag>);

    // Shadowling
    this.result_string_map["shadowling"] = {};
    this.result_string_map["shadowling"]["shadowling win - shadowling ascension"] = (<Tag color="green"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Win - Shadowlings ascended"}</Tag>);
    this.result_string_map["shadowling"]["shadowling loss - shadowling killed"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Shadowlings eliminated"}</Tag>);
    this.result_string_map["shadowling"]["shadowling loss - generic failure"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Shadowlings failed"}</Tag>);
    this.result_string_map["shadowling"]["shadowling loss - crew escaped"] = (<Tag color="red"><FontAwesomeIcon icon={faTimes} />&nbsp;{"Loss - Crew escaped"}</Tag>);

    console.log("[RDP] Loaded.");
  }

  secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    return h + ":" + m + ":" + s;
  }

  parseDuration(r) {
    if (!r["start_datetime"] || !r["end_datetime"]) {
      return "N/A";
    }
    let sdate = Date.parse(r["start_datetime"]);
    let edate = Date.parse(r["end_datetime"]);
    let duration = (edate - sdate) / 1000;
    return this.secondsToHms(duration);
  }

  nextOffset() {
    return this.last_offset;
  }

  formatMode(mode) {
    if (this.mode_icon_map[mode]) {
      return this.mode_icon_map[mode];
    }

    return mode;
  }

  formatRoundButton(rid) {
    return (
      <Button type="primary" ghost>
        <Link to={"/round/" + rid}>
          #{rid}
        </Link>
      </Button>
    );
  }

  // Take a round's mode and result, and format us a nice view
  parseEndString(r) {
    if (this.result_string_map[r["game_mode"]]) {
      if (r["game_mode_result"]) {
        if (this.result_string_map[r["game_mode"]][r["game_mode_result"]]) {
          return this.result_string_map[r["game_mode"]][r["game_mode_result"]];
        }
      }

      return (<Tag color="purple"><FontAwesomeIcon icon={faQuestion} />&nbsp;{r["game_mode_result"]}</Tag>);
    }

    // Handle normal stuff
    if (r["game_mode_result"] === "Admin ended") {
      return (<Tag color="yellow"><FontAwesomeIcon icon={faRedo} />&nbsp;{"Admin-forced round end"}</Tag>);
    }

    if (r["end_state"] && r["end_state"].startsWith("admin reboot - by ")) {
      let formatted_text = r["end_state"].charAt(0).toUpperCase() + r["end_state"].substr(1);
      return (<Tag color="yellow"><FontAwesomeIcon icon={faRedo} />&nbsp;{formatted_text}</Tag>);
    }

    switch (r["end_state"]) {
      case "restart vote": {
        return (<Tag color="yellow"><FontAwesomeIcon icon={faVoteYea} />&nbsp;{"Restart vote"}</Tag>);
      }

      case "nuke - unhandled ending":
      case "nuke": {
        return (<Tag color="orange"><FontAwesomeIcon icon={faBomb} />&nbsp;{"Station destroyed by nuclear device"}</Tag>);
      }

      case "proper completion": {
        return (<Tag color="cyan"><FontAwesomeIcon icon={faCheck} />&nbsp;{"Proper completion"}</Tag>);
      }
    }

    return (<Tag color="purple"><FontAwesomeIcon icon={faQuestion} />&nbsp;{r["end_state"]}</Tag>);
  }

  getMetadataTable(md) {
    return (
      <>
        <h3>Round metadata</h3>
        <Descriptions bordered style={{ height: "340px", marginRight: "20px" }}>
          <Descriptions.Item label="Start Time" span={3}>
            {md["start_datetime"]}
          </Descriptions.Item>
          <Descriptions.Item label="End Time" span={3}>
            {md["end_datetime"]}
          </Descriptions.Item>
          <Descriptions.Item label="Round Duration" span={3}>
            {this.parseDuration(md)}
          </Descriptions.Item>
          <Descriptions.Item label="Gamemode" span={3}>
            {this.formatMode(md["game_mode"])}
          </Descriptions.Item>
          <Descriptions.Item label="Mode Result" span={3}>
            {this.parseEndString(md)}
          </Descriptions.Item>
          <Descriptions.Item label="Server Commit Hash" span={3}>
            <Button ghost>
              <a target="_blank" rel="noreferrer" href={"https://github.com/ParadiseSS13/Paradise/commit/" + md["commit_hash"]}>
                <FontAwesomeIcon icon={faCodeBranch} />
                &nbsp;{md["commit_hash"]}
              </a>
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }

  getPlayerGraph(pd) {
    let clean_data = [];

    Object.entries(pd).forEach(s => {
      let this_dict = {};
      this_dict["Date"] = s[0];
      this_dict["Players"] = s[1];
      clean_data.push(this_dict);
    });

    // Parse the playerdata
    const config = {
      data: clean_data,
      padding: 'auto',
      xField: 'Date',
      yField: 'Players',
    };

    return (
      <>
        <h3>Players over time</h3>
        <Line {...config} style={{ height: "340px", marginLeft: "20px" }} />
      </>
    );
  }
}

export const RDP = new RoundDataParser();
