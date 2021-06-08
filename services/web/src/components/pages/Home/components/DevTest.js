import { useEffect } from 'react';

const DevTest = () => {
  const panda = () => {
    var config = {
      nodeId: 'form-container-790d5364-7f1d-4cbe-b450-c4ae5c22a2e7',
      width: '100%',
      height: '700px',
      url:
        'https://eform.pandadoc.com/?eform=55358256-3a2a-4105-95b6-2b4db6b47315',
      events: {
        loaded: function() {},
        started: function(data) {},
        completed: function(data) {},
        exception: function(data) {},
      },
      data: {},
    };

    const dataQueryString = config.data
      ? Object.keys(config.data)
          .map(function(key) {
            return (
              '&' +
              key +
              '=' +
              encodeURIComponent(JSON.stringify(config.data[key]))
            );
          })
          .join('')
      : '';

    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.src = config.url + dataQueryString;

    if (config.nodeId) {
      var node = document.getElementById(config.nodeId);
      node.style.height = config.height;
      node.style.width = config.width;
      iframe.height = '100%';
      iframe.width = '100%';
      node.append(iframe);
    } else {
      iframe.height = config.height;
      iframe.width = config.width;
      document.body.append(iframe);
    }

    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    window[eventMethod](
      messageEvent,
      function(e) {
        if (
          e &&
          e.data &&
          config &&
          iframe &&
          e.source === iframe.contentWindow
        ) {
          try {
            var message = JSON.parse(e.data);
            if (message && message.event) {
              var event = message.event.replace('embed.form.', '');
              var callback = config.events ? config.events[event] : null;
              if (callback) {
                callback(message.data);
              }
            }
          } catch (e) {}
        }
      },
      false
    );
  };

  useEffect(() => {
    panda();
  }, []);

  return (
    <div>
      <div id="form-container-790d5364-7f1d-4cbe-b450-c4ae5c22a2e7"></div>;
    </div>
  );
};

export default DevTest;
