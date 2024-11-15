// analytics.js
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HYR4ESN93X');

/*Facebook Tracking*/
document.addEventListener('DOMContentLoaded', function() {
    var facebookButton = document.getElementById('facebook-follow-button');
    
    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            // Check if gtag is defined (Google Analytics is loaded)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Social Media',
                    'event_label': 'Facebook Follow Button',
                    'transport_type': 'beacon',
                    'event_callback': function(){
                        console.log('Facebook follow button clicked');
                    }
                });
            }
        });
    }
});
