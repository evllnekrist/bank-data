(() => {
  // node_modules/@left4code/tw-starter/dist/js/dom.js
  var dom_default = dom = (() => {
    const getNodeList = (arg) => {
      if (typeof arg === "string" && arg.trim().slice(0, 1) !== "<") {
        return document.querySelectorAll(arg);
      } else if (typeof arg === "string" && arg.trim().slice(0, 1) === "<") {
        const dom2 = domParser(arg);
        return [dom2];
      } else if (typeof arg === "object" && arg instanceof NodeList) {
        return arg;
      } else if (typeof arg === "object" && arg instanceof HTMLElement) {
        return [arg];
      } else if (typeof arg === "object" && arg instanceof SVGElement) {
        return [arg];
      } else {
        return arg;
      }
    };
    const domParser = (arg) => {
      const parser = new DOMParser(), content = "text/html", DOM = parser.parseFromString(arg, content);
      return DOM.body.childNodes[0];
    };
    const addEvent = (nodeList, event, callback) => {
      nodeList[event] = callback;
    };
    const uuidv4 = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    };
    const eventPath = (evt) => {
      let path = evt.composedPath && evt.composedPath() || evt.path, target = evt.target;
      if (path != null) {
        return path.indexOf(window) < 0 ? path.concat(window) : path;
      }
      if (target === window) {
        return [window];
      }
      function getParents(node, memo) {
        memo = memo || [];
        let parentNode = node.parentNode;
        if (!parentNode) {
          return memo;
        } else {
          return getParents(parentNode, memo.concat(parentNode));
        }
      }
      return [target].concat(getParents(target), window);
    };
    const addEvents = (nodeList) => {
      addEvent(nodeList, "on", (arg1, arg2, arg3) => {
        nodeList.forEach((node) => {
          node.addEventListener(
            arg1,
            (e) => {
              const uuid = uuidv4();
              if (typeof arg2 === "string") {
                eventPath(e).every((parentNode) => {
                  if (parentNode.matches && parentNode.matches(arg2)) {
                    parentNode[uuid] = arg3;
                    parentNode[uuid](parentNode);
                    delete parentNode[uuid];
                    return false;
                  } else {
                    return true;
                  }
                });
              } else {
                node[uuid] = arg2;
                node[uuid](e);
                delete node[uuid];
              }
            },
            false
          );
        });
        return nodeList;
      });
      addEvent(nodeList, "css", (arg1, arg2) => {
        if (arg2 === void 0 && typeof arg1 !== "object") {
          return getComputedStyle(nodeList[0])[arg1];
        }
        nodeList.forEach((node) => {
          if (typeof arg1 === "object") {
            for (const [key, val] of Object.entries(arg1)) {
              node.style[key] = val;
            }
          } else {
            node.style[arg1] = arg2;
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "slideUp", (arg1 = 300, arg2 = () => {
      }) => {
        nodeList.forEach((node) => {
          node.style.transitionProperty = "height, margin, padding";
          node.style.transitionDuration = arg1 + "ms";
          node.style.height = node.offsetHeight + "px";
          node.offsetHeight;
          node.style.overflow = "hidden";
          node.style.height = 0;
          node.style.paddingTop = 0;
          node.style.paddingBottom = 0;
          node.style.marginTop = 0;
          node.style.marginBottom = 0;
          window.setTimeout(() => {
            node.style.display = "none";
            node.style.removeProperty("height");
            node.style.removeProperty("padding-top");
            node.style.removeProperty("padding-bottom");
            node.style.removeProperty("margin-top");
            node.style.removeProperty("margin-bottom");
            node.style.removeProperty("overflow");
            node.style.removeProperty("transition-duration");
            node.style.removeProperty("transition-property");
            const uuid = uuidv4();
            node[uuid] = arg2;
            node[uuid](node);
            delete node[uuid];
          }, arg1);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "slideDown", (arg1 = 300, arg2 = () => {
      }) => {
        nodeList.forEach((node) => {
          node.style.removeProperty("display");
          let display = window.getComputedStyle(node).display;
          if (display === "none")
            display = "block";
          node.style.display = display;
          let height = node.offsetHeight;
          node.style.overflow = "hidden";
          node.style.height = 0;
          node.style.paddingTop = 0;
          node.style.paddingBottom = 0;
          node.style.marginTop = 0;
          node.style.marginBottom = 0;
          node.offsetHeight;
          node.style.transitionProperty = "height, margin, padding";
          node.style.transitionDuration = arg1 + "ms";
          node.style.height = height + "px";
          node.style.removeProperty("padding-top");
          node.style.removeProperty("padding-bottom");
          node.style.removeProperty("margin-top");
          node.style.removeProperty("margin-bottom");
          window.setTimeout(() => {
            node.style.removeProperty("height");
            node.style.removeProperty("overflow");
            node.style.removeProperty("transition-duration");
            node.style.removeProperty("transition-property");
            const uuid = uuidv4();
            node[uuid] = arg2;
            node[uuid](node);
            delete node[uuid];
          }, arg1);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "fadeOut", (arg1 = 300, arg2 = () => {
      }) => {
        nodeList.forEach((node) => {
          node.style.opacity = 1;
          node.style.transitionProperty = "opacity";
          node.style.transitionDuration = arg1 + "ms";
          node.style.opacity = 0;
          window.setTimeout(() => {
            node.style.display = "none";
            node.style.removeProperty("transition-property");
            node.style.removeProperty("transition-duration");
            node.style.removeProperty("opacity");
            const uuid = uuidv4();
            node[uuid] = arg2;
            node[uuid](node);
            delete node[uuid];
          }, arg1);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "fadeIn", (arg1 = 300, arg2 = () => {
      }) => {
        nodeList.forEach((node) => {
          let display = window.getComputedStyle(node).display;
          if (display === "none")
            display = "block";
          node.style.display = display;
          node.style.opacity = 0;
          node.style.transitionProperty = "opacity";
          node.style.transitionDuration = arg1 + "ms";
          window.setTimeout(() => {
            node.style.opacity = 1;
            window.setTimeout(() => {
              node.style.removeProperty("transition-property");
              node.style.removeProperty("transition-duration");
              node.style.removeProperty("opacity");
            }, arg1);
            const uuid = uuidv4();
            node[uuid] = arg2;
            node[uuid](node);
            delete node[uuid];
          }, arg1);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "hide", () => {
        nodeList.forEach((node) => {
          node.style.display = "none";
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "show", () => {
        nodeList.forEach((node) => {
          if (node.style.display === "none") {
            node.style.display = "block";
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "clone", () => {
        let clonedNodes = [];
        nodeList.forEach((node) => {
          clonedNodes.push(node.cloneNode(true));
        });
        addEvents(clonedNodes);
        return clonedNodes;
      });
      addEvent(nodeList, "each", (arg1) => {
        nodeList.forEach((node, index) => {
          const uuid = uuidv4();
          node[uuid] = arg1;
          node[uuid](index, node);
          delete node[uuid];
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "find", (arg1) => {
        let results = [];
        nodeList.forEach((node) => {
          const matchedNodes = node.querySelectorAll(arg1);
          if (matchedNodes.length) {
            matchedNodes.forEach((matchedNode) => {
              results.push(matchedNode);
            });
          }
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "hasClass", (arg1) => {
        let found = false;
        nodeList.forEach((node) => {
          if (node.classList.contains(arg1))
            found = true;
        });
        return found;
      });
      addEvent(nodeList, "removeClass", (arg1) => {
        if (arg1.length) {
          arg1.split(" ").forEach((classname) => {
            nodeList.forEach((node) => {
              node.classList.remove(classname);
            });
          });
        }
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "addClass", (arg1) => {
        if (arg1.length) {
          arg1.split(" ").forEach((classname) => {
            nodeList.forEach((node) => {
              node.classList.add(classname);
            });
          });
        }
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "is", (arg1) => {
        if (typeof arg1 === "string") {
          return (nodeList[0].matches || nodeList[0].matchesSelector || nodeList[0].msMatchesSelector || nodeList[0].mozMatchesSelector || nodeList[0].webkitMatchesSelector || nodeList[0].oMatchesSelector).call(nodeList[0], arg1);
        } else {
          return nodeList[0] === arg1;
        }
      });
      addEvent(nodeList, "attr", (arg1, arg2) => {
        if (arg2 === void 0 && typeof arg1 !== "object") {
          if (nodeList[0] !== void 0) {
            const attr = nodeList[0].getAttribute(arg1);
            return attr === null ? void 0 : attr;
          } else {
            return void 0;
          }
        }
        nodeList.forEach((node) => {
          if (typeof arg1 === "object") {
            for (const [key, val] of Object.entries(arg1)) {
              node.setAttribute(key, val);
            }
          } else {
            node.setAttribute(arg1, arg2);
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "removeAttr", (arg1) => {
        nodeList.forEach((node) => {
          node.removeAttribute(arg1);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "data", (arg1, arg2) => {
        if (arg2 === void 0) {
          const attr = nodeList[0].getAttribute(`data-${arg1}`);
          return attr === null ? void 0 : attr;
        }
        nodeList.forEach((node) => {
          node.setAttribute(`data-${arg1}`, arg2);
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "width", (arg1) => {
        if (arg1 === void 0) {
          if (nodeList === window) {
            return parseInt(window.innerWidth);
          } else {
            return typeof nodeList[0] !== "undefined" ? parseInt(getComputedStyle(nodeList[0])["width"]) : null;
          }
        }
        if (nodeList === window) {
          window.resizeTo(arg1, window.innerHeight);
        } else {
          nodeList.forEach((node) => {
            node.style["width"] = arg1;
          });
        }
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "height", (arg1) => {
        if (arg1 === void 0) {
          if (nodeList === window) {
            return parseInt(window.innerHeight);
          } else {
            return typeof nodeList[0] !== "undefined" ? parseInt(getComputedStyle(nodeList[0])["height"]) : null;
          }
        }
        if (nodeList === window) {
          window.resizeTo(window.innerWidth, arg1);
        } else {
          nodeList.forEach((node) => {
            node.style["height"] = arg1;
          });
        }
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "css", (arg1, arg2) => {
        if (arg2 === void 0 && typeof arg1 !== "object") {
          return getComputedStyle(nodeList[0])[arg1];
        }
        nodeList.forEach((node) => {
          if (typeof arg1 === "object") {
            for (const [key, val] of Object.entries(arg1)) {
              node.style[key] = val;
            }
          } else {
            node.style[arg1] = arg2;
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "replaceWith", (arg1) => {
        const replacerNodes = [];
        const argumentTypes = getNodeList(arg1);
        nodeList.forEach((node, key) => {
          argumentTypes.forEach((replacerNode) => {
            let dom2 = replacerNode;
            if (key > 0) {
              dom2 = replacerNode.cloneNode(true);
            }
            node.parentNode.insertBefore(dom2, node.nextSibling);
            replacerNodes.push(dom2);
          });
          node.remove();
        });
        addEvents(replacerNodes);
        return replacerNodes;
      });
      addEvent(nodeList, "insertAfter", (arg1) => {
        const insertedNodes = [];
        const argumentTypes = getNodeList(arg1);
        nodeList.forEach((node) => {
          argumentTypes.forEach((targetNode, key) => {
            let dom2 = node;
            if (key > 0) {
              dom2 = node.cloneNode(true);
            }
            targetNode.parentNode.insertBefore(dom2, targetNode.nextSibling);
            insertedNodes.push(dom2);
          });
        });
        addEvents(insertedNodes);
        return insertedNodes;
      });
      addEvent(nodeList, "appendTo", (arg1) => {
        const appendedNodes = [];
        const argumentTypes = getNodeList(arg1);
        nodeList.forEach((node) => {
          argumentTypes.forEach((targetNode, key) => {
            let dom2 = node;
            if (key > 0) {
              dom2 = node.cloneNode(true);
            }
            targetNode.appendChild(dom2);
            appendedNodes.push(dom2);
          });
        });
        addEvents(appendedNodes);
        return appendedNodes;
      });
      addEvent(nodeList, "append", (arg1) => {
        const argumentTypes = getNodeList(arg1);
        nodeList.forEach((node, key) => {
          argumentTypes.forEach((appendNode) => {
            let dom2 = appendNode;
            if (key > 0) {
              dom2 = appendNode.cloneNode(true);
            }
            node.appendChild(dom2);
          });
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "remove", () => {
        nodeList.forEach((node) => {
          if (node.parentNode !== null) {
            node.parentNode.removeChild(node);
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "first", () => {
        const firstNode = nodeList[0] !== void 0 ? [nodeList[0]] : [];
        addEvents(firstNode);
        return firstNode;
      });
      addEvent(nodeList, "last", () => {
        const lastNodeList = nodeList[nodeList.length - 1] !== void 0 ? [nodeList[nodeList.length - 1]] : [];
        addEvents(lastNodeList);
        return lastNodeList;
      });
      addEvent(nodeList, "val", (arg1) => {
        if (arg1 === void 0) {
          if (nodeList[0] instanceof HTMLSelectElement && nodeList[0].multiple) {
            const selectedOptions = [];
            for (const selectedOption of nodeList[0].selectedOptions) {
              selectedOptions.push(selectedOption.value);
            }
            return selectedOptions;
          } else {
            return nodeList[0].value;
          }
        }
        nodeList.forEach((node) => {
          if (node instanceof HTMLSelectElement) {
            node.value = "";
            if (typeof arg1 !== "object") {
              arg1 = [arg1];
            }
            for (const value of arg1) {
              const selectedOption = Array.from(node).find(
                (option) => option.value == value
              );
              if (selectedOption !== void 0) {
                selectedOption.selected = true;
              }
            }
          } else {
            node.value = arg1;
          }
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "html", (arg1) => {
        if (arg1 === void 0) {
          return nodeList[0].innerHTML;
        }
        nodeList.forEach((node) => {
          node.innerHTML = arg1;
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "text", (arg1) => {
        if (arg1 === void 0) {
          return nodeList[0].textContent;
        }
        nodeList.forEach((node) => {
          node.textContent = arg1;
        });
        addEvents(nodeList);
        return nodeList;
      });
      addEvent(nodeList, "filter", (arg1) => {
        let results = [];
        nodeList.forEach((node, index) => {
          const uuid = uuidv4();
          node[uuid] = arg1;
          const filter = node[uuid](index, node);
          delete node[uuid];
          if (filter) {
            results.push(node);
          }
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "closest", (arg1) => {
        let results = [];
        nodeList.forEach((node) => {
          const matchedNode = node.closest(arg1);
          if (matchedNode !== null && !results.filter((resNode) => resNode === matchedNode).length)
            results.push(matchedNode);
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "children", (arg1) => {
        let results = [];
        nodeList.forEach((node) => {
          for (const matchedNode of node.children) {
            if (arg1 === void 0) {
              results.push(matchedNode);
            } else {
              for (const childNode of node.querySelectorAll(arg1)) {
                if (childNode === matchedNode)
                  results.push(childNode);
              }
            }
          }
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "parent", () => {
        let results = [];
        nodeList.forEach((node) => {
          const matchedNode = node.parentNode;
          if (matchedNode !== null && !results.filter((resNode) => resNode === matchedNode).length)
            results.push(matchedNode);
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "prev", () => {
        let results = [];
        nodeList.forEach((node) => {
          if (node.previousElementSibling !== null) {
            results.push(node.previousElementSibling);
          }
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "next", () => {
        let results = [];
        nodeList.forEach((node) => {
          if (node.nextElementSibling !== null) {
            results.push(node.nextElementSibling);
          }
        });
        addEvents(results);
        return results;
      });
      addEvent(nodeList, "off", () => {
        let results = [];
        nodeList.forEach((node) => {
          let dom2 = node.cloneNode(true);
          node.parentNode.replaceChild(dom2, node);
          results.push(dom2);
        });
        addEvents(results);
        return results;
      });
    };
    return window.dom = (arg) => {
      const nodeList = getNodeList(arg);
      addEvents(nodeList);
      return nodeList;
    };
  })();

  // src/js/vendors/dom.js
  window.$ = dom_default;
})();
