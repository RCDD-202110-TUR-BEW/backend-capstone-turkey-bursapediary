/* eslint-disable no-underscore-dangle */
const isAuthorUser = (object, user, type) => {
  switch (type) {
    case 'user':
      if (object._id === user._id) return true;
      break;
    case 'project':
      if (object.owners.includes(user._id)) return true;
      break;
    case 'comment':
      if (
        object.comments[
          object.comments.findIndex((comment) => comment.user._id === user._id)
        ] !== -1
      )
        return true;
      break;
    case 'review':
      if (
        object.reviews[
          object.reviews.findIndex((review) => review.user._id === user._id)
        ] !== -1
      )
        return true;
      break;
    default:
      return false;
  }
  return false;
};

module.exports = isAuthorUser;
