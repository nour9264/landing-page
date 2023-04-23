const navigationBar = document.getElementById("navbar__list");
const createNavItems = () => {
  navigationBar.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const listItem = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navigationBar.insertAdjacentHTML("beforeend", listItem);
  });
};

 let sectionNumber = 0;
 const adding_section = () => {
   sectionNumber++;
   const content = `<section id="section${sectionNumber}" data-nav="Section ${sectionNumber}">
     <div class="landing__container">
     <h2>Section ${sectionNumber}</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
     
     <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
     </div>
     </section>`;
   document.querySelector("main").insertAdjacentHTML("beforeend", content);
 };

navigationBar.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.nav) {
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 200);
  }
});

const sectionObserving = () => {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        console.log(entry)
        let activeLink = navigationBar.querySelector(`[data-nav=${entry.target.id}]`);
        if (entry.isIntersecting) {
          entry.target.classList.add("your-active-class");
          activeLink.classList.add("active-link");
        } else {
         location.hash = `${entry.target.id}`; 
          entry.target.classList.remove("your-active-class");
          activeLink.classList.remove("active-link");
        }
      });
    },
     
    {
      threshold: 0.5
    }
  );

  return document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};

window.onscroll = function() {
	document.querySelectorAll("section").forEach(function(active) {
    let activeLink = navigationBar.querySelector(`[data-nav=${active.id}]`);
	if(active.getBoundingClientRect().top >= -400 && active.getBoundingClientRect().top <= 150){

    active.classList.add("your-active-class");
    activeLink.classList.add("active-link");

    }
    else{
         active.classList.remove("your-active-class");
         activeLink.classList.remove("active-link");
    }
	});
}

const theTopBtn = document.getElementById("to-top");
const header = document.querySelector(".page__header");

// creating more sections by click on the button
document.getElementById("btn").addEventListener("click", () => {
  adding_section();
  createNavItems();
});

for (let i = 1; i < 5; i++) adding_section();
createNavItems();

theTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

let duringTheScroll;
document.onscroll = () => {
  header.style.display = "block"
  clearTimeout(duringTheScroll)
   duringTheScroll = setTimeout(() => {
    header.style.display = "none";
  }, 4000);


  window.scrollY > 800
    ? (theTopBtn.style.display = "block")
    : (theTopBtn.style.display = "none");
};