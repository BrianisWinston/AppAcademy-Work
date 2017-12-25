class AttrAccessorObject
  def self.my_attr_accessor(*names)
    define_method(*names) do |name|
      self.instance_variable_set("@#{name.to_s}")
      self.instance_variable_get("@#{name.to_s}")
    end
  end
end
