require "byebug"
# ### Factors
#
# Write a method `factors(num)` that returns an array containing all the
# factors of a given number.

def factors(num)
  (1..num).to_a.select {|el| num % el == 0}
end

# p factors(11)
# p factors(50)
# p factors(360)

# ### Bubble Sort
#
# http://en.wikipedia.org/wiki/bubble_sort
#
# Implement Bubble sort in a method, `Array#bubble_sort!`. Your method should
# modify the array so that it is in sorted order.
#
# > Bubble sort, sometimes incorrectly referred to as sinking sort, is a
# > simple sorting algorithm that works by repeatedly stepping through
# > the list to be sorted, comparing each pair of adjacent items and
# > swapping them if they are in the wrong order. The pass through the
# > list is repeated until no swaps are needed, which indicates that the
# > list is sorted. The algorithm gets its name from the way smaller
# > elements "bubble" to the top of the list. Because it only uses
# > comparisons to operate on elements, it is a comparison
# > sort. Although the algorithm is simple, most other algorithms are
# > more efficient for sorting large lists.
#
# Hint: Ruby has parallel assignment for easily swapping values:
# http://rubyquicktips.com/post/384502538/easily-swap-two-variables-values
#
# After writing `bubble_sort!`, write a `bubble_sort` that does the same
# but doesn't modify the original. Do this in two lines using `dup`.
#
# Finally, modify your `Array#bubble_sort!` method so that, instead of
# using `>` and `<` to compare elements, it takes a block to perform the
# comparison:
#
# ```ruby
# [1, 3, 5].bubble_sort! { |num1, num2| num1 <=> num2 } #sort ascending
# [1, 3, 5].bubble_sort! { |num1, num2| num2 <=> num1 } #sort descending
# ```
#
# #### `#<=>` (the **spaceship** method) compares objects. `x.<=>(y)` returns
# `-1` if `x` is less than `y`. If `x` and `y` are equal, it returns `0`. If
# greater, `1`. For future reference, you can define `<=>` on your own classes.
#
# http://stackoverflow.com/questions/827649/what-is-the-ruby-spaceship-operator

class Array
  def bubble_sort!
    sorted = false
    until sorted
      sorted = true
      (0..self.length-2).to_a.each do |idx|
        if self[idx] > self[idx+1]
          self[idx], self[idx+1] = self[idx+1], self[idx]
          sorted = false
        end
      end
    end
  end

  def bubble_sort(&prc)
    new_arr = self.dup
    new_arr.bubble_sort!
  end

  def bubble_sort_block(&block)
    sorted = false
    until sorted
      sorted = true
      (0..self.length-2).to_a.each do |idx|
        if block.call(self[idx]) > block.call(self[idx+1])
          self[idx], self[idx+1] = self[idx+1], self[idx]
          sorted = false
        end
      end
    end
  end
end

class Array
  def  my_each(&prc)
    self.length.times do |counter|
      prc.call(self[counter])
    end
  end
end

# a = [4,6,3,7,23,6,123,532,1,-3]
# p a
# p a.bubble_sort_block {|num| num / 7}
# p a
#
# b = [23,23,6,24,94,-35,-856,234,17,5,1]
# p b
# p b.bubble_sort_block {|num| num % 17 }
# p b
# ### Substrings and Subwords
#
# Write a method, `substrings`, that will take a `String` and return an
# array containing each of its substrings. Don't repeat substrings.
# Example output: `substrings("cat") => ["c", "ca", "cat", "a", "at",
# "t"]`.
#
# Your `substrings` method returns many strings that are not true English
# words. Let's write a new method, `subwords`, which will call
# `substrings`, filtering it to return only valid words. To do this,
# `subwords` will accept both a string and a dictionary (an array of
# words).

def substrings(string)
  arr = []
  string.length.times do |idx|
    counter = idx
    idx.upto(string.length - 1) do
      arr << string[idx..counter]
      counter += 1
    end
  end
  arr
end

def subwords(word, dictionary)
  substrings(word).select do |el|
    dictionary.include?(el)
  end
end
#
# p substrings("cat") #=> ["c", "ca", "cat", "a", "at", "t"]
# p subwords("cat", ["cat", "at"])

# ### Doubler
# Write a `doubler` method that takes an array of integers and returns an
# array with the original elements multiplied by two.

def doubler(array)
  array.map{|el| el*2}
end
# w = [1,8,46,"e","yolo"]
# p doubler(w)
# ### My Each
# Extend the Array class to include a method named `my_each` that takes a
# block, calls the block on every element of the array, and then returns
# the original array. Do not use Enumerable's `each` method. I want to be
# able to write:
#
# ```ruby
# # calls my_each twice on the array, printing all the numbers twice.
# return_value = [1, 2, 3].my_each do |num|
#   puts num
# end.my_each do |num|
#   puts num
# end
# # => 1
#      2
#      3
#      1
#      2
#      3
#
# p return_value # => [1, 2, 3]
# ```

class Array

  def my_each(&prc)
    self.length.times do |idx|
      prc.call(self[idx])
    end
  end

end

# [1,2,3,"wow","bow"].my_each {|el| p el*2}

# ### My Enumerable Methods
# * Implement new `Array` methods `my_map` and `my_select`. Do
#   it by monkey-patching the `Array` class. Don't use any of the
#   original versions when writing these. Use your `my_each` method to
#   define the others. Remember that `each`/`map`/`select` do not modify
#   the original array.
# * Implement a `my_inject` method. Your version shouldn't take an
#   optional starting argument; just use the first element. Ruby's
#   `inject` is fancy (you can write `[1, 2, 3].inject(:+)` to shorten
#   up `[1, 2, 3].inject { |sum, num| sum + num }`), but do the block
#   (and not the symbol) version. Again, use your `my_each` to define
#   `my_inject`. Again, do not modify the original array.

class Array
  def my_map(&prc)
    arr = []
    self.my_each do |el|
      arr << prc.call(el)
    end
    arr
  end

  def my_select(&prc)
    to_be_returned = []
    self.my_each do |el|
     to_be_returned << el if prc.call(el)
    end
    to_be_returned
  end

  def my_inject(&blk)
    starting_value = 0
    self.my_each { |num| starting_value += blk.call(num)}
    starting_value
  end
end


b = [ 7, 4, 2, 65, 23, 4 ].my_inject { |variable|   |num| num**2 }
p b
# b = [7,4,2,65,23,4].my_map{|num| num ** 2}
# p b
#
# a = [1,2,3,4,5,6,7,8,9].my_select{|num| num.even?}
# p a
# ### Concatenate
# Create a method that takes in an `Array` of `String`s and uses `inject`
# to return the concatenation of the strings.
#
# ```ruby
# concatenate(["Yay ", "for ", "strings!"])
# # => "Yay for strings!"
# ```

def concatenate(strings)
end




# class Array
#   def my_each(&block)
#     i = 0
#     while i < self.length
#       block.call(self[i])
#       i += 1
#     end
#   end
#
  # def my_select(&block)
  #   true_arr = []
  #
  #   self.my_each do |el|
  #     true_arr << el if block.call(el)
  #   end
  #   true_arr
  # end
#
#   def my_reject(&block)
#     true_arr = []
#     self.my_each do |el|
#       true_arr << el if !block.call(el)
#     end
#     true_arr
#   end
#
#   def my_any?(&block)
#     self.my_each do |el|
#       return false if !block.call(el)
#     end
#     true
#   end
#
#   def my_flatten
#     flattened_array = []
#     self.my_each do |el|
#       if el.is_a?(Array)
#         num = el.my_flatten
#         flattened_array.concat(num)
#       else
#         flattened_array << el
#       end
#
#     end
#     flattened_array
#     # self.join.split("").map(&:to_i)
#   end
#
#   def my_zip(*args)
#     iter_arr = [self]
#     args.each do |arr|
#       iter_arr << arr
#     end
#     result_arr = Array.new(self.length) {Array.new(args.length+1)}
#
#     (0...self.length).to_a.each do |el|
#       (0..args.length).to_a.each do |id|
#           result_arr[el][id] = iter_arr[id][el]
#       end
#     end
#     result_arr
#   end
#
#   def my_rotate(shift = 1)
#     rotate = shift % self.length
#     # debugger
#     # if shift > 0
#       (rotate.abs).times {self.push(self.shift)}
#     # else
#     #   debugger
#     #   (rotate.abs).times{self.unshift(self.pop)}
#     # end
#
#     self
#   end
#
#   def my_join(sep = '')
#     new_str = ''
#     my_each { |el| new_str += el + sep }
#     sep == '' ? new_str : new_str[0...-1]
#   end
#
#   def my_reverse
#     new_array = []
#     my_each { |el| new_array.unshift(el) }
#     new_array
#   end
# end
#
# p [ "a", "b", "c" ].my_reverse   #=> ["c", "b", "a"]
# p [ 1 ].my_reverse               #=> [1]
#
# # a = [ "a", "b", "c", "d" ]
# p a.my_join         # => "abcd"
# p a.my_join("$")    # => "a$b$c$d"

# a = [ "a", "b", "c", "d" ]
# b = [ "a", "b", "c", "d" ]
# c = [ "a", "b", "c", "d" ]
# d = [ "a", "b", "c", "d" ]
# e = [ "a", "b", "c", "d" ]
#
# p a.my_rotate         #=> ["b", "c", "d", "a"]
# p b.my_rotate(2)      #=> ["c", "d", "a", "b"]
# p c.my_rotate(-3)     #=> ["b", "c", "d", "a"]
# p d.my_rotate(15)     #=> ["d", "a", "b", "c"]
# p e.my_rotate(-10)    #[c, d, a, b]
# a = [ 4, 5, 6 ]
# b = [ 7, 8, 9 ]
# p [1, 2, 3].my_zip(a, b) # => [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
# p a.my_zip([1,2], [8])   # => [[4, 1, 8], [5, 2, nil], [6, nil, nil]]
# p [1, 2].my_zip(a, b)    # => [[1, 4, 7], [2, 5, 8]]
#
# c = [10, 11, 12]
# d = [13, 14, 15]
# p [1, 2].my_zip(a, b, c, d)    # => [[1, 4, 7, 10, 13], [2, 5, 8, 11, 14]]


# array = [1, 2, 3, [4,5],[6,[7],[[8]]], 9]

# array.my_each do |num|
#   p num
# end
#
# p array.my_select { |num| num > 1 }
# p array.my_reject { |num| num > 1 }
# p array.my_any? { |num| num < 4}
# p array.my_any? { |num| num > 5}
# p array.my_flatten
