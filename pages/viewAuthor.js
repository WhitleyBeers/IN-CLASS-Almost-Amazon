import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  let domString = `
  <div class="text-white ms-5 details">
  <h3>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
  Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
  </div>
  
  <div class="text-white ms-5 details">
  <hr>
  <h3>Books</h5>
  </div>`;

  obj.authorBooksArray.forEach((book) => {
    domString += `
    <div class="card">
        <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${book.title}</h5>
            <p class="card-text bold">${book.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${book.firebaseKey}"></i>
            <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>
    `;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
