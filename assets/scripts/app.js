$(document).ready(function () {
  let users = [];
  // Función para recuperar todos los clientes de la base de datos
  async function getClientes() {
    const response = await fetch("../scripts/model/getClientes.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    const data = JSON.parse(text); // Parsear a JSON para trabajar
    users = data; // Asignar los usuarios a la variable global
    renderUsers(data); // Mostrar los usuarios iniciales
  }

  // Función para meter los usuarios dentro del contenedor
  function renderUsers(users) {
    // Vaciar el contenedor de las cartas
    $(".card-container").empty();
    // Recorrer la lista usuarios
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      // Añadir cada carta al contenedor de las cartas
      $(".card-container").append(
        `<div class="card">
            <div class="card-header">
                <img src="${user.img}" alt="Profile Image">
            </div>
            <div class="card-body">
                <h2>${user.name}</h2>
                <p>DNI: ${user.dni}</p>
                <p>Profesión: ${user.profesion}</p>
                <p>Dirección: ${user.dir}</p>
                <p>Teléfono: ${user.tlfn}</p>
            </div>
            <div class="card-footer">
                <button class="btn-edit" data-id="${user.id}">Editar</button>
                <button class="btn-delete" data-id="${user.id}">Eliminar</button>
            </div>
        </div>`
      );
    }
  }

  // Carga los usuarios cuando carge el HTML
  getClientes();

  // Cuando se haga click al boton de buscar se hara lo siguiente
  $("#search").on("click", function () {
    // obtener lo que se escribe en el input
    const nameFilter = $(".filterName").val().toLowerCase();
    // filtrar los usuarios que coincidan con el valor del input
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(nameFilter)
    );
    // Poner en el contenedor las cartas de los usuarios que coincidan
    renderUsers(filtered);
  });  

  // Evento para eliminar usuarios
  $(".card-container").on("click", ".btn-delete", function () {
    const id = $(this).data("id");
    const $card = $(this).closest(".card");

    // Mostrar un mensaje de confirmación
    const confirmDelete = confirm("¿Estás seguro de eliminar este cliente?");

    if (confirmDelete) {
      // Eliminar el cliente de la base de datos
      fetch("../scripts/model/deleteCliente.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            $card.fadeOut(400, function () {
              // Eliminar la carta del DOM
              $card.remove();
            });
          } else {
            alert("Error al eliminar el cliente.");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar cliente:", error);
          alert("Ocurrió un error.");
        });
    }
  });

  // Función para abrir el modal
  function openEditModal(user) {
    $("#editName").val(user.name);
    $("#editDni").val(user.dni);
    $("#editJob").val(user.profesion);
    $("#editDir").val(user.dir);
    $("#editTlfn").val(user.tlfn);
    $("#editModal").data("id", user.id).fadeIn();
  }

  // Abirir el modal
  $(".card-container").on("click", ".btn-edit", function () {
    const id = $(this).data("id");
    // Cargar los datos del cliente desde la base de datos
    fetch(`../scripts/model/getCliente.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => openEditModal(data))
      .catch((error) => {
        console.error("Error al cargar los datos del cliente:", error);
        alert("Error al cargar el cliente.");
      });
  });

  // Cerrar el modal cuando al clicar X
  $(".close").on("click", function () {
    $("#editModal").fadeOut();
  });

  // Función para guardar los cambios
  $("#editForm").on("submit", function (e) {
    e.preventDefault();

    const id = $("#editModal").data("id"); // Obtener el id desde el modal
    const updatedUser = {
      id: id,
      name: $("#editName").val(),
      dni: $("#editDni").val(),
      profesion: $("#editJob").val(),
      dir: $("#editDir").val(),
      tlfn: $("#editTlfn").val(),
    };

    // Enviar los datos actualizados a la base de datos
    fetch("../scripts/model/updateCliente.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // alert("Cliente actualizado correctamente");
          getClientes(); // Recargar los clientes
          $("#editModal").fadeOut();
        } else {
          alert("Error al actualizar el cliente");
        }
      })
      .catch((error) => {
        console.error("Error al actualizar cliente:", error);
        alert("Error al actualizar cliente");
      });
  });

  // Función para abrir el modal
  function openAddUserModal() {
    $("#addUserModal").fadeIn();
  }

  // Función cerrar modal de añadir
  function closeAddUserModal() {
    $("#addUserModal").fadeOut();
  }

  // Abrir modal
  $("#add").on("click", function () {
    openAddUserModal();
  });

  // Cerrar modal al clicar X
  $(".close").on("click", function () {
    closeAddUserModal();
  });

  // Función para añadir usuarios
  $("#addUserForm").on("submit", function (e) {
    e.preventDefault();
  
    // Sacar los datos del formulario
    const newUser = {
      name: $("#addUserName").val(),
      dni: $("#addUserDni").val(),
      profesion: $("#addUserJob").val(),
      dir: $("#addUserDir").val(),
      tlfn: $("#addUserTlfn").val(),
    };
  
    // Enviar los datos al servidor usando fetch
    fetch("../scripts/model/addCliente.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(newUser),
    })
    .then((response) => response.text())  
    .then((text) => {
      console.log(text); 
      const data = JSON.parse(text);
      if (data.success) {
        $("#addUserForm")[0].reset();
        // alert("Cliente agregado correctamente");
        getClientes();
        closeAddUserModal();
      } else {
        alert("Error al agregar cliente: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error al agregar cliente:", error);
      alert("Error al agregar cliente");
    });    
  });
  
  
});
