import React, {useEffect} from "react";
import AppRouter from "./routes";
import {initUserAction} from "./redux/actions/user/initUser";
import {connect} from "react-redux";
import Spinner from "./components/spinner";

function App({initUser, fetching}) {
  useEffect(() => {
    initUser();

    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Optionally, send analytics event that PWA install promo was shown.
      alert(`'beforeinstallprompt' event was fired.`);
    });

    document.getElementById("pwa-btn").addEventListener("click", async () => {
      // Hide the app provided install promotio
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const {outcome} = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      alert(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null;
    });
  }, [initUser]);
  return (
    <>
      <button id="pwa-btn">test</button>
      {fetching && <Spinner />}
      <AppRouter />
    </>
  );
}

export const mapStateToProps = (state) => ({
  isUserInitialized: state.user.isUserInitialized,
  fetching: state.user.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  initUser: (props) => dispatch(initUserAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
