export const calculateMaxPages = (allDoctors, doctorsPerPage, pages) => {
  for (let i = 1; i <= Math.ceil(allDoctors.length / doctorsPerPage); i++) {
    pages.push(i);
  }
};
