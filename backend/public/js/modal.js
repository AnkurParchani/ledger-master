/* eslint-disable */

// For all same type of modals
export const showModal = modalName => {
  const modalForm = document.querySelectorAll(".modalForm");
  const modalBackdrop = document.querySelector(".modalBackdrop");
  const closeModalBtn = document.querySelectorAll(".closeModalBtn");

  function getModal(modalClass) {
    modalForm.forEach((forms, i) => {
      const currentModal = document.querySelector(`.${modalClass}`);

      function openModal() {
        currentModal.style.display = "block";
        modalBackdrop.style.display = "block";
      }
      openModal();
      function closeModal() {
        currentModal.style.display = "none";
        modalBackdrop.style.display = "none";
      }

      modalBackdrop.addEventListener("click", closeModal);
      closeModalBtn[i].addEventListener("click", closeModal);
    });
  }

  if (modalName === "addCustomer") getModal("customerAddForm");
  if (modalName === "updateCustomer") getModal("updateCustomerForm");
  if (modalName === "customerSearch") getModal("customerSearchForm");
  if (modalName === "entrySearch") getModal("entrySearchForm");
  if (modalName === "addEntry") getModal("addEntryForm");
  if (modalName === "updateEntry") getModal("updateExistingEntryForm");
  if (modalName === "addDocs") getModal("addDocs");
};

// For showing documents modal
export const showDocumentsModal = () => {
  const documentContainer = document.querySelector(".showDocuments");
  const modalBackdrop = document.querySelector(".modalBackdrop");

  function openModal() {
    documentContainer.style.display = "block";
    modalBackdrop.style.display = "block";
  }
  openModal();

  function closeModal() {
    document.querySelector(".showDocuments").insertAdjacentHTML(
      "beforeend",
      `<div class='owl-carousel owl-theme documentsCarousel'>
      </div>`
    );

    documentContainer.style.display = "none";
    modalBackdrop.style.display = "none";
    document.querySelector(".owl-loaded").remove();
  }

  document
    .querySelector(".closeDocModalBtn")
    .addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
};

// For showing Contact modal
export const showContactModal = () => {
  const contactModal = document.querySelector(".contactModal");
  const modalBackdrop = document.querySelector(".modalBackdrop");
  const cancelBtn = document.querySelector(".contactCancelBtn");

  // Opening the modal
  contactModal.classList.remove("hidden");
  modalBackdrop.style.display = "block";

  // If user choose Cancel button
  cancelBtn.addEventListener("click", () => {
    contactModal.classList.add("hidden");
    modalBackdrop.style.display = "none";
  });
};
