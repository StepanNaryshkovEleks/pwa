import {useEffect, useRef, useState} from "react";

export default ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  freezeOnceVisible = true,
}) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold,
      freezeOnceVisible,
    })
  );

  useEffect(() => {
    const {current: currentObserver} = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};
