<template>
  <div class="wrapper">
    <ul class="content">
      <li>标签1</li>
      <li>标签2</li>
      <li>标签3</li>
      <li>标签4</li>
      <li>标签5</li>
      <li>标签6</li>
      <li>标签7</li>
      <li>标签8</li>
      <li>标签9</li>
      <li>标签10</li>
      <li>标签11</li>
      <li>标签12</li>
      <li>标签13</li>
      <li>标签14</li>
      <li>标签15</li>
      <li>标签16</li>
      <li>标签17</li>
      <li>标签18</li>
      <li>标签19</li>
      <li>标签20</li>
      <li>标签21</li>
      <li>标签22</li>
      <li>标签23</li>
      <li>标签24</li>
      <li>标签25</li>
      <li>标签26</li>
      <li>标签27</li>
      <li>标签28</li>
      <li>标签29</li>
      <li>标签30</li>
      <li>标签31</li>
      <li>标签32</li>
      <li>标签33</li>
      <li>标签34</li>
      <li>标签35</li>
      <li>标签36</li>
      <li>标签37</li>
      <li>标签38</li>
      <li>标签39</li>
      <li>标签40</li>
      <li>标签41</li>
      <li>标签42</li>
      <li>标签43</li>
      <li>标签44</li>
      <li>标签45</li>
      <li>标签46</li>
      <li>标签47</li>
      <li>标签48</li>
      <li>标签49</li>
      <li>标签50</li>
    </ul>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true
      })

      this.scroll.on('scroll',(position) => {
        // console.log(position)
      })
      
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
  }
</style>
