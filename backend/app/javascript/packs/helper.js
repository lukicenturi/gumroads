window.getStarsTemplate = (rating) => {
  return [...Array(5)].map((e, i) =>
    `<i class="fas fa-star ${i < rating ? 'active' : ''}"></i>`).join('');
}
