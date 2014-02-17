
function Location( name, score, votes) {

  this._id = null;
  this.name = name;
  this.score = score || 0;
  this.votes = votes || [];

  this.upsert = function () {
    if (this._id) {
      Locations.update(this._id, {
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
  };
}

