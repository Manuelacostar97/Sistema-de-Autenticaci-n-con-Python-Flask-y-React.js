const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			

			activeUser: [
				{
				id: "Guest",
				name: "Pueba",
				last_name: "Prueba",
				city: "Casa",
				email: "test@gmail.com",
				phone: "(424) 1112233",
				},
			],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setActiveUser: (user) => {
				setStore({
				activeUser: [user],
				});
			},


			register: async (name, lastName, city, phone, email, password) => {
				try {
				let new_user;
				new_user = {
					name: name,
					last_name: lastName,
					city: city,
					phone: phone,
					email: email,
					password: password,
				};
				const response = await fetch(
					process.env.BACKEND_URL + "/api/register",
					{
					method: "POST",
					body: JSON.stringify(new_user),
					headers: {
						"Content-Type": "application/json",
					},
					}
				);
				if (!response.ok) {
					return false;
				}
				getActions().setImg(undefined);
				return true;
				} catch (error) {}
			},

		login: async (email, password) => {
			try {
			let user;
			user = { email: email, password: password };
			const response = await fetch(process.env.BACKEND_URL + "/api/login", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
				"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				new Error("Ocurrió un error en la solicitud");
			}
			const body = await response.json();
			if (body.token == undefined) {
				return false;
			} else {
				getActions().setActiveUser(body);
				localStorage.setItem("token", body.token);
				localStorage.setItem("id", body.id);
				return true;
			}
			} catch (error) {}
		},
		getUser: async (userid) => {
			try {
			const response = await fetch(
				process.env.BACKEND_URL + `/api/user/${userid}`,
				{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				}
			);
			if (response.status == "401") {
				getActions().logout();
				return false;
			} else if (!response.ok) {
				new Error("Ocurrió un error en la solicitud");
			}
			const body = await response.json();
			getActions().setActiveUser(body);
			return true;
			} catch (error) {}
		},
		logout: () => {
			localStorage.removeItem("token");
			localStorage.removeItem("id");
			getActions().setActiveUser({ id: "Guest" });
		},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
