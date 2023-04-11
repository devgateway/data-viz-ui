/**
 * File customize-preview.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function ($) {


    // Listen for any changes in the Customizer Preview.
    wp.customize.bind("change", function (setting) {
        if (document.getElementById("react-preview") && document.getElementById("react-preview").contentWindow.postMessage) {
            console.log(setting.id);
            document.getElementById("react-preview").contentWindow.postMessage(
           ({"messageType": 'partial-update', 'property': setting.id, 'value': setting._value}), "*");
        }
    })




})(jQuery);
