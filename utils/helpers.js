module.exports = {
  formatDate: (date) => {
    const newDate = new Date(date).toLocaleDateStrong();
    return newDate;
  },
};
