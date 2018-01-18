class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = (this.$el.data("initial-follow-state") ||
                        options.followState);
    this.render();
    this.$el.on('click', this.handleClick.bind(this));

  }

  render() {
    if (this.followState === 'followed'){
      this.$el.html('Unfollow!');
    } else if (this.followState === 'unfollowed') {
      this.$el.html('Follow!');
    }
  }

  handleClick(event) {
    const followToggle = this;

    event.preventDefault();

    if (this.followState === 'followed') {
      this.followState = 'unfollowing';
      this.render();
    } else if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();
      });
    }
  }
}


module.exports = FollowToggle;
