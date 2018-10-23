<template>
  <v-btn
    outline
    small
    round
    color="primary"
    @click='onAttachmentClicked(attachment)'>
    <v-progress-circular
      indeterminate
      color="primary"
      v-if='attachment.downloading'
    ></v-progress-circular>
    <v-icon
      left
      v-if='!attachment.downloading'
    >save_alt</v-icon>
    {{attachment.name + "(" + attachment.size + ")"}}
  </v-btn>
</template>

<script>
export default {
  props: {
    attachment: Object
  },
  methods: {
    onAttachmentClicked (attachment) {
      var payload = {
        self: this,
        attachment: attachment
      }
      this.$store.dispatch('fetchAttachmentContent', payload)
    }
  },
  name: 'AttachmentToDownload'
}
</script>
