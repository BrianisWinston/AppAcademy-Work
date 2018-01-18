class UsersSearch {
  constructor(ele) {
    this.$el = $(ele);
    this.userId = this.$el.data('user-id');
    this.followState = (this.$el.data('initial-follow-state');
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  renderResults(users) {
    this.$ul.empty();

    for (let i = 0; i < users.length; i++) {
      let user = users[i];

      let $a = $('<a></a>');
      $a.text(`@${user.username}`);
      let $li = $('<li></li>');
      this.$ul.append($li);

      let $followToggle = $('<button></button>');
      new FollowToggle($followToggle, {
        userId: user.id,
        followState:
         if (user.followed) {
          return 'followed';
          } else {
          return 'unfollowed';
          }
      });
    }
  }
}
