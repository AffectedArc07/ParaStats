import axios from 'axios';

class ApiManager {
  constructor() {
    console.log("[API] Loading...");

    this.apiroot = "https://api.paradisestation.org/stats/";

    this.all_rounds = [];
    this.last_offset = 0;

    // Key: round ID | value: dict of pop data + feedback values, both parsed
    this.all_round_data = {};

    console.log("[API] Loaded.");
  }

  async loadRounds(offset) {
    if (!offset && this.all_rounds.length > 0) {
      return; // Dont do anything
    }
    let offset_text = "";
    if (offset) {
      offset_text = "?offset=" + String(offset);
    }
    let response = await axios.get(this.apiroot + "roundlist" + offset_text);

    response.data.forEach(element => {
      this.all_rounds.push(element);
      this.last_offset = element["round_id"];
    });
  }

  getRounds() {
    return this.all_rounds;
  }

  nextOffset() {
    return this.last_offset;
  }

  // Returns the round data if it can, otherwise null
  async getRound(rid) {
    const round_id_int = parseInt(rid, 10);
    if (this.all_round_data[round_id_int]) {
      return this.all_round_data[round_id_int]; // Cached
    }

    let this_round = {};
    // Now lets see if it exists
    let response = await axios.get(this.apiroot + "blackbox/" + rid, { validateStatus: false });
    if (response.status === 404) {
      // Round ongoing or not found
      return null;
    }

    if (response.status === 200) {
      // We got a response, so lets parse it out
      this_round["blackbox"] = {};

      let round_dict = response.data;
      round_dict.forEach(k => {
        let this_key = {};
        this_key["ktype"] = k["key_type"];
        this_key["kversion"] = k["version"];
        this_key["kdata"] = JSON.parse(k["raw_data"])["data"];
        this_round["blackbox"][k["key_name"]] = this_key;

      });

      // Get the pop data
      let pop_response = await axios.get(this.apiroot + "playercounts/" + rid);
      this_round["popcounts"] = pop_response.data;

      // Get the metadata
      let metadata_response = await axios.get(this.apiroot + "metadata/" + rid);
      this_round["metadata"] = metadata_response.data;

      this.all_round_data[round_id_int] = this_round;
    }

    return this_round;
  }
}

export const API = new ApiManager();
window.aa_debug = API;
