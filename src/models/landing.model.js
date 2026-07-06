import { model, Schema } from "mongoose";

const landingSchema = new Schema({ 
  imageUrls: [{ 
    type: String,
    required: true,
  }],

  title: { 
    type: String,
    required: true,
  },

  summary: { 
    type: String,
    required: true,
  },

  tagline: { 
    type: String,
    required: true,
  },

  links: [{ 
    icon: { 
      type: String,
      required: true,
    },

    label: { 
      type: String,
      required: true,
    },

    url: { 
      type: String,
      required: true,
    },
  }],

  servicesData: {
    text: { 
      type: String,
      required: true,
    },

    servicesOffered: [{ 
      header: { 
        type: String,
        required: true,
      },
      description: { 
        type: String,
        required: true,
      },
      icon: { 
        type: String,
        required: true,
      },
    }],

    serviceImageUrls: [{ 
      type: String,
      required: true,
    }],
  },
});

export const Landing = model('Landing', landingSchema);