module.exports = {
  formatDate: (date) => {
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
  },
};
