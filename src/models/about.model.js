import { model, Schema } from "mongoose";

const aboutSchema = new Schema({ 
  imageUrls: [{ 
    type: String,
    required: true,
  }],

  title: { 
    type: String,
    required: true,
  },
  
  text: String,

  businessDetails: [{
    icon: { 
      type: String,
      required: true,
    }, 
    title: { 
      type: String,
      required: true,
    },
    value: { 
      type: String,
      required: true,
    },
  }],

  missionStatement: { 
    title: { 
      type: String,
      required: true,
    },
    text: { 
      type: String,
      required: true,
    },
    // MAX: 2
    subDetails: [{ 
      imageUrl: { 
        type: String,
        required: true,
      },
      title: { 
        type: String,
        required: true,
      },
    }],
  },

  visionary: { 
    imageUrl: { 
      type: String,
      required: true,
    },

    quote: {
      type: String,
      // TODO: Implement a maximum character
    },

    name: { 
      type: String,
      required: true,
    },

    position: { 
      type: String,
    },

    text: { 
      type: String,
      required: true,
    },
  },
});

export const About = model("About", aboutSchema);

