
function Group( name ) {

  this._id = null;
  this.name = name;
  this.members = [];

  this.startTime = "12:30pm";

  this.choiceLocationId = null;
  this.choiceDate = new DateTime();

  /*this.upsert = function () {
    if (this._id) {
      G.update(this._id, {
        $set: {
          name: this.name,
          scores: this.scores,
          votes: this.votes
        }
      });
    } else {
      Locations.insert({
        name: this.name,
        score: this.score,
        votes: this.votes
      });
    }
  };*/
}
