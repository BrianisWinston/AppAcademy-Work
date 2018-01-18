const APIUtil = {

  followUser: id => {
    APIUtil.changeFollow(id, 'POST')
  }

  unfollowUser: id => {
    APIUtil.changeFollow(id, 'DELETE')
  }

  changeFollow: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: 'json',
      method
    })
  );
};

module.exports = APIUtil;
