
        // Get all area elements within the map
        const mapAreas = document.querySelectorAll('map[name="zooMap"] area');
        const hoverInfo = document.getElementById('hoverInfo');

        // Add event listeners for hover effect
        mapAreas.forEach(area => {
            area.addEventListener('mouseover', function() {
                // Display the title (place name) in the hover info box
                hoverInfo.textContent = this.getAttribute('title');
                hoverInfo.classList.add('show'); // Make it visible
            });

            area.addEventListener('mouseout', function() {
                // Clear content and hide the hover info box
                hoverInfo.textContent = '';
                hoverInfo.classList.remove('show');
            });
            // The 'click' event is handled by the default behavior of the href attribute.
        });

        // Ensure responsiveness of the image map
        window.addEventListener('resize', resizeMap);
        window.addEventListener('load', resizeMap);

        /**
         * Adjusts the image map coordinates based on the image's current size.
         * This is a basic implementation and might need more advanced logic for complex shapes.
         */
        function resizeMap() {
            const img = document.querySelector('.map-image');
            // Assuming the original image width is 700px. Adjust if your map.jpg has a different base width.
            const originalWidth = 700;
            const currentWidth = img.offsetWidth;
            const ratio = currentWidth / originalWidth;

            mapAreas.forEach(area => {
                // Store original coordinates on first load, or retrieve if already stored
                if (!area.originalCoords) {
                    area.originalCoords = area.getAttribute('coords').split(',').map(Number);
                }
                const newCoords = area.originalCoords.map(coord => Math.round(coord * ratio));
                area.setAttribute('coords', newCoords.join(','));
            });
        }
    