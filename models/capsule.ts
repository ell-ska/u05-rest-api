import { InferSchemaType, model, Schema } from 'mongoose'

import { imageSchema } from '../schemas/image'
import { z } from 'zod'

const lockValidation = {
  validator: function () {
    const schema = z
      .object({
        lockedAt: z.date().optional(),
        unlockDate: z.date().optional(),
      })
      .refine((data) => {
        return (
          (data.lockedAt && data.unlockDate) ||
          (!data.lockedAt && !data.unlockDate)
        )
      })

    const { success } = schema.safeParse(this)
    return success
  },
  message: 'document must have either both lockedAt and unlockDate, or neither',
}

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    lockedAt: {
      type: Date,
      validate: lockValidation,
    },
    unlockDate: {
      type: Date,
      validate: lockValidation,
    },
    showCountdown: {
      type: Boolean,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
    },
    content: {
      type: String,
    },
    images: [imageSchema],
    senders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    receivers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Capsule = model<InferSchemaType<typeof schema>>('Capsule', schema)
