const gallery = document.getElementById('gallery');
        const items = [...gallery.querySelectorAll('.gallery-item')].filter(item =>
            item.querySelector('img')
        );
        const title = document.getElementById('image-title');
        const desc = document.getElementById('image-desc');
        const dotsContainer = document.getElementById('dots');


        window.addEventListener('load', () => {

            const middleIndex = Math.floor(items.length / 2);
            const middleItem = items[middleIndex];

            // Scroll to middle item
            const scrollX = middleItem.offsetLeft - gallery.scrollLeft - gallery.getBoundingClientRect().left + gallery.scrollLeft;
            gallery.scrollTo({ left: scrollX, behavior: 'smooth' });

            // Optional: update dot and arrows manually after scroll
            //updateActiveDot();
            //updateArrowVisibility();
        });

        items.forEach((item, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                const scrollX = item.offsetLeft - gallery.scrollLeft - gallery.getBoundingClientRect().left + gallery.scrollLeft;
                gallery.scrollTo({ left: scrollX, behavior: 'smooth' });

            });

            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        const updateActive = () => {
            let closest = null;
            let minDist = Infinity;
            let activeIndex = 0;


            items.forEach((item, i) => {
                const box = item.getBoundingClientRect();
                const centerDist = Math.abs(box.left + box.width / 2 - window.innerWidth / 2);
                if (centerDist < minDist) {
                    minDist = centerDist;
                    closest = item;
                    activeIndex = i;
                    console.log(activeIndex);
                }
                if (activeIndex <= 0) document.querySelector('.nav-button.left').style.display = "none";
                else document.querySelector('.nav-button.left').style.display = "flex";
                if (activeIndex >= items.length - 1) document.querySelector('.nav-button.right').style.display = "none";
                else document.querySelector('.nav-button.right').style.display = "flex";
            });

            items.forEach(item => item.classList.remove('active'));
            closest.classList.add('active');


            dots.forEach(dot => dot.classList.remove('active'));
            dots[activeIndex].classList.add('active');
        };

        gallery.addEventListener('scroll', () => {
            requestAnimationFrame(updateActive);
        });

        // Buttons
        document.querySelector('.nav-button.left').addEventListener('click', () => {
            gallery.scrollBy({ left: -320, behavior: 'smooth' });
        });

        document.querySelector('.nav-button.right').addEventListener('click', () => {
            gallery.scrollBy({ left: 320, behavior: 'smooth' });
        });

        window.addEventListener('load', updateActive);