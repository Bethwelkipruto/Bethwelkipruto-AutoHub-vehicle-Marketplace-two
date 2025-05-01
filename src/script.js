document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");
    const contactTable = document.getElementById("contact-table").querySelector("tbody");
  
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(addContactToTable);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const car = document.getElementById("car").value.trim();
  
      if (!name || !email || !phone || !car) {
        alert("Please fill out all fields.");
        return;
      }
  
      const contact = { name, email, phone };
  
     
      contacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(contacts));
  
     
      addContactToTable(contact);
  
      confirmationMessage.textContent = `Message sent to seller about ${car}.`;
      confirmationMessage.style.display = "block";
      form.reset();
  
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 4000);
    });
  
   
    contactTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        const email = row.children[1].textContent;
  
       
        row.remove();
  
       
        const updatedContacts = contacts.filter(c => c.email !== email);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      }
    });
  
    
    function addContactToTable(contact) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      contactTable.appendChild(row);
    }
  });