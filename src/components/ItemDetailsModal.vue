<template>
  <div class="modal-background" v-if="visible" @click.self="close">
    <div class="modal-content">
      <div class="image-slider-container">
        <img :src="currentImageUrl" alt="Item photo" class="item-photo">
        <div class="dots-container">
          <span 
            v-for="(photo, index) in item.photos" 
            :key="index" 
            class="dot" 
            :class="{ active: currentIndex === index }" 
            @click="setCurrentIndex(index)">
          </span>
        </div>
      </div>
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
      <hr class="modal-divider"> 
      <h2>Information</h2>
      <p v-if="item.condition">Condition: {{ item.condition }}</p>
      <p v-if="item.quantity">Quantity: {{ item.quantity }}</p>
      <p>Price: RM {{ item.price }}</p>
      <p v-if="item.location">Location: {{ item.location }}</p>
      <p v-if="item.collectionMethod">Collection Method: {{ item.collectionMethod }}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({ photos: [] }),
    },
    visible: Boolean
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentImageUrl() {
      return this.item.photos.length > 0 ? this.item.photos[this.currentIndex].url : '';
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    setCurrentIndex(index) {
      this.currentIndex = index;
    }
  }
}
</script>

  
<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6); /* Slightly darker background for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* High z-index to be on top of other content */
}

.modal-divider {
  border: 0; /* Removes the default border */
  height: 0.1px; /* Sets the thickness of the line */
  background-color: #757575; /* Sets the color of the line */
  margin: 10px 0; /* Adds space above and below the line */
}

.modal-content {
  background: #ECEFF1; /* Soft gray background from your palette */
  padding: 30px; /* Increased padding for a more generous space */
  border-radius: 10px; /* Slightly larger border-radius for a softer look */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); /* Larger shadow for a pop-out effect */
  width: auto; /* Adaptive width */
  max-width: 500px; /* Slightly smaller max-width for a neater appearance */
  max-height: 80vh; /* Maximum height */
  overflow-y: auto; /* Scrolling for overflow content */
  margin: 20px; /* Margin around the modal */
  text-align: left;
}

.item-photo {
  max-width: 100%; /* Full width */
  border-top-left-radius: 10px; /* Rounded top corners */
  border-top-right-radius: 10px; /* Rounded top corners */
  height: auto; /* Maintain aspect ratio */
  display:b
}

.modal-content h2 {
  color: #333; /* Darker font for the title for better readability */
  margin-bottom: 10px; /* Space after the title */
}

.modal-content p {
  color: #666; /* Dark gray for the paragraph text, softer than black */
  margin-bottom: 5px; /* Less space between paragraphs for a compact look */
}

.modal-content button {
  background-color: #1A6757; /* Teal color from your palette for the button */
  color: rgb(248, 235, 235); /* White text on the button */
  border: none; /* No border */
  padding: 12px 25px; /* Larger padding for a bigger button */
  border-radius: 20px; /* Fully rounded corners for the button */
  font-weight: bold; /* Bold font for the button text */
  cursor: pointer; /* Pointer cursor on hover */
}

.image-container {
  position: relative;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>



<!-- <template>
  <div class="modal-background" v-if="visible" @click.self="close" @keydown="handleKeyPress">
    <div class="modal-content">

      <div class="image-carousel">
        <img :src="currentImage.url" :alt="`Item photo ${currentIndex + 1}`" class="item-photo">
        <div class="left-arrow" @click="prevImage"></div>
        <div class="right-arrow" @click="nextImage"></div>
      </div>

      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
      <hr class="modal-divider"> 

      <h2>Information</h2>
      <p v-if="item.condition">Condition: {{ item.condition }}</p>
      <p v-if="item.quantity">Quantity: {{ item.quantity }}</p>
      <p>Price: RM {{ item.price }}</p>
      <p v-if="item.location">Location: {{ item.location }}</p>
      <p v-if="item.collectionMethod">Collection Method: {{ item.collectionMethod }}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    visible: Boolean
  },
  computed: {
    currentImage() {
      // This computed property will update whenever 'item' changes.
      return this.item.photos[this.currentIndex];
    }
  },
  data() {
    return {
      currentIndex: 0,
      // Removed currentImage from data as it's now a computed property
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        // Removed the line updating currentImage, as it's now computed
      }
    },
    nextImage() {
      if (this.currentIndex < this.item.photos.length - 1) {
        this.currentIndex++;
        // Removed the line updating currentImage, as it's now computed
      }
    }
  }
};
</script>

  
<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6); /* Slightly darker background for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* High z-index to be on top of other content */
}

.modal-divider {
  border: 0; /* Removes the default border */
  height: 0.1px; /* Sets the thickness of the line */
  background-color: #757575; /* Sets the color of the line */
  margin: 10px 0; /* Adds space above and below the line */
}

.modal-content {
  background: #ECEFF1; /* Soft gray background from your palette */
  padding: 30px; /* Increased padding for a more generous space */
  border-radius: 10px; /* Slightly larger border-radius for a softer look */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); /* Larger shadow for a pop-out effect */
  width: auto; /* Adaptive width */
  max-width: 500px; /* Slightly smaller max-width for a neater appearance */
  max-height: 80vh; /* Maximum height */
  overflow-y: auto; /* Scrolling for overflow content */
  margin: 20px; /* Margin around the modal */
  text-align: left;
}

.image-carousel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative; /* Add this line */
}

.item-photo {
  max-width: 100%; /* Full width */
  border-top-left-radius: 10px; /* Rounded top left corner */
  border-top-right-radius: 10px; /* Rounded top right corner */
  height: auto; /* Maintain aspect ratio */
}

.left-arrow,
.right-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5); /* Half-transparent background */
  border-radius: 50%;
  cursor: pointer;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.modal-content h2 {
  color: #333; /* Darker font for the title for better readability */
  margin-bottom: 10px; /* Space after the title */
}

.modal-content p {
  color: #666; /* Dark gray for the paragraph text, softer than black */
  margin-bottom: 5px; /* Less space between paragraphs for a compact look */
}

.modal-content button {
  background-color: #1A6757; /* Teal color from your palette for the button */
  color: rgb(248, 235, 235); /* White text on the button */
  border: none; /* No border */
  padding: 12px 25px; /* Larger padding for a bigger button */
  border-radius: 20px; /* Fully rounded corners for the button */
  font-weight: bold; /* Bold font for the button text */
  cursor: pointer; /* Pointer cursor on hover */
}
</style> -->