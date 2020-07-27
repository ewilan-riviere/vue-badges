<template>
  <div>
    <div>
      All badges available
    </div>
    <dependencies :all="true"></dependencies>
    <div>
      Custom badges
    </div>
    <dependencies
      :deps="[
        ['visual studio code', '1.4'],
        ['visual_studio_code', '1.2'],
        ['visual-studio-code'],
        ['nodejs'],
        ['node-js', '11.15'],
        ['node.js', '12.15'],
        ['php'],
        ['New tech'],
        ['my tech', '2.3'],
        [
          {
            label: 'My new tech',
            version: '2.4',
            color: '3DDC84',
            logo: 'android',
          },
        ],
      ]"
    ></dependencies>
  </div>
</template>
