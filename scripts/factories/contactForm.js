/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
class ContactForm {
  constructor() {
    this.modalbg = document.getElementById("bground");
    this.contactButton = document.querySelector(".contactButton");
    this.body = document.querySelector(".body");
    this.firstName = document.getElementById("first");
    this.lastName = document.getElementById("last");
    this.email = document.getElementById("email");
    this.textArea = document.getElementById("textarea");
    this.form = document.getElementById("form");
    this.regEx = /^([A-Za-z]){2,}?([-]){0,}?([A-Za-z]){0,}/;
    // eslint-disable-next-line operator-linebreak
    this.regExMail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.create();
  }

  create() {
    // fermeture de la modal
    this.modalbg.querySelector(".closeModal").addEventListener("click", () => {
      this.close();
    });

    // fermeture de la modal touche entrée sur la croix
    this.modalbg
      .querySelector(".closeModal")
      .addEventListener("keydown", (e) => {
        const eventKey = e.key;
        if (eventKey === "Enter") {
          this.close();
        }
      });

    // fermeture de la modal touche echap
    document.addEventListener("keydown", (e) => {
      const eventKey = e.key;
      if (eventKey === "Escape") {
        this.close();
      }
    });

    // envoi formulaire
    this.form.addEventListener("submit", (e) => {
      this.send(e);
      console.log(this.firstName.value);
      console.log(this.lastName.value);
      console.log(this.email.value);
      console.log(this.textArea.value);
    });

    // verification prenom lors de la saisie
    this.firstName.addEventListener("input", () => {
      this.checkFirst();
    });

    // verification nom lors de la saisie
    this.lastName.addEventListener("input", () => {
      this.checkLast();
    });

    // verification mail lors de la saisie
    this.email.addEventListener("input", () => {
      this.checkEmail();
    });

    // verification zone de texte lors de la saisie
    this.textArea.addEventListener("input", () => {
      this.checkTextArea();
    });
  }

  checkFirst() {
    if (!this.firstName.value.match(this.regEx)) {
      // si la valeur saisie est fausse ajout d'une bordure rouge
      this.firstName.parentElement.setAttribute("data-error-visible", "true");
      this.firstName.style.border = "2px solid #e54858";
      return false;
    }
    // si la valeur saisie est bonne ajout d'une bordure verte
    this.firstName.parentElement.setAttribute("data-error-visible", "false");
    this.firstName.style.border = "solid #279e7a 0.19rem";
    return true;
  }

  checkLast() {
    if (!this.lastName.value.match(this.regEx)) {
      // si la valeur saisie est fausse ajout d'une bordure rouge
      this.lastName.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
      this.lastName.style.border = "2px solid #e54858";
      return false;
    }
    // si la valeur saisie est bonne ajout d'une bordure verte
    this.lastName.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
    this.lastName.style.border = "solid #279e7a 0.19rem";
    return true;
  }

  checkEmail() {
    if (!this.email.value.match(this.regExMail)) {
      // si la valeur saisie est fausse ajout d'une bordure rouge
      this.email.parentElement.setAttribute("data-error-visible", "true");
      this.email.style.border = "2px solid #e54858";
      return false;
    }
    // si la valeur saisie est bonne ajout d'une bordure verte
    this.email.parentElement.setAttribute("data-error-visible", "false");
    this.email.style.border = "solid #279e7a 0.19rem";
    return true;
  }

  checkTextArea() {
    if (!this.textArea.value.match(this.regEx)) {
      // si la valeur saisie est fausse ajout d'une bordure rouge
      this.textArea.parentElement.setAttribute("data-error-visible", "true");
      this.textArea.style.border = "2px solid #e54858";
      return false;
    }
    // si la valeur saisie est bonne ajout d'une bordure verte
    this.textArea.parentElement.setAttribute("data-error-visible", "false");
    this.textArea.style.border = "solid #279e7a 0.19rem";
    return true;
  }

  checkAll() {
    this.checkFirst();
    this.checkLast();
    this.checkEmail();
    this.checkTextArea();
  }

  validForm() {
    return (
      this.checkFirst() &&
      this.checkLast() &&
      this.checkEmail() &&
      this.checkTextArea()
    );
  }

  open() {
    const name = document.querySelector(".h2name").textContent; // recherche du nom du photographe
    document.querySelector(".contactName").innerText = name; // ecriture du nom du photographe dans la modal
    this.modalbg.setAttribute("aria-hidden", "false"); // zone de la modal apparente
    this.body.classList.add("noScroll"); // ne pas pouvoir scroll l'arriere plan
    this.modalbg.style.display = "block"; // apparition de la modal
    this.firstName.focus(); // focus sur le premier element à saisir
    document.querySelectorAll(".stopFocus").forEach((element) => {
      // retirer le focus des elements en arriere plan
      element.setAttribute("tabindex", "-1");
    });
  }

  close() {
    document.querySelectorAll(".stopFocus").forEach((element) => {
      // remettre le focus des elements en arriere plan
      element.setAttribute("tabindex", "0");
    });
    this.modalbg.setAttribute("aria-hidden", "true"); // zone de la modal invisible
    this.body.classList.remove("noScroll"); // remettre le scroll
    this.modalbg.style.display = "none"; // disparition de la modal
  }

  send(e) {
    e.preventDefault();
    // si tout les champs sont bien saisie
    if (this.validForm()) {
      document.querySelectorAll(".stopFocus").forEach((element) => {
        // remettre le focus des elements en arriere plan
        element.setAttribute("tabindex", "0");
      });
      this.modalbg.setAttribute("aria-hidden", "true"); // zone de la modal invisible
      this.body.classList.remove("noScroll"); // remettre le scroll
      this.modalbg.style.display = "none"; // disparition de la modal
    } else {
      this.checkAll(); // sinon on reverifie
    }
  }
}
