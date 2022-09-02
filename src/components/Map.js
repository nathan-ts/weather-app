export default function Map(props) {
  return (
    <div style={{ 
      overflow: 'hidden', 
      resize: 'none',
      maxWidth: '100%',
      width: '500px',
      height: '500px',
    }}>
      <div id="gmapdisplay" 
        style={{ 
          height: '100%',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <iframe 
          style={{ 
            height: '100%',
            width: '100%',
            border: '0',
          }}
          frameborder="0" 
          title="google-map"
          src="https://www.google.com/maps/embed/v1/place?q=Toronto&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        >
        </iframe>
      </div>
      <a class="googlemap-html" 
        href="https://changing.hosting" 
        id="make-mapdata"
      >
        now
      </a>
      {/* <style>#gmapdisplay img{max-width:none!important;background:none!important;font-size: inherit;font-weight:inherit;}
      </style> */}
    </div>
  )
};