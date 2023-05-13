export const calculateMaxPages = (allDoctors, doctorsPerPage, pages) => {
  for (let i = 1; i <= Math.ceil(allDoctors.length / doctorsPerPage); i++) {
    pages.push(i);
  }
};


export const bannerImages = [
  {
    label: '',
    imgPath:
      '/images/7.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/8.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/1.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/10.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/11.jpg',
  },
];