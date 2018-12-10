import { firebase, db } from '../Firebase';

export default (next, fallback = () => { }) =>
	firebase.auth.onAuthStateChanged(authUser => {
		if (authUser) {
			db.user(authUser.uid)
				.once('value')
				.then(snapshot => {
					let dbUser = snapshot.val();

					authUser = {
						id: authUser.uid,
						email: authUser.email,
						...dbUser,
					};

					next(authUser);
				});
		} else {
			fallback();
		}
	});