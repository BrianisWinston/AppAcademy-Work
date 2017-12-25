require 'sqlite3'
require 'singleton'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  def initialize
    super('questions.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

class User
  attr_accessor :fname, :lname

  def self.all
    data = QuestionsDatabase.instance.execute("SELECT * FROM users")
    data.map { |datum| User.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @fname = options['fname']
    @lname = options['lname']
  end

  def self.find_by_id(id)
    user = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL
    return nil unless user.length > 0

    User.new(user.first)
  end

  def self.find_by_name(fname, lname)
    user = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
      SELECT
        *
      FROM
        users
      WHERE
        fname = (?) and lname = (?)

    SQL
    return nil unless user.length > 0

    User.new(user.first)
  end

  def authored_questions(id)
    Question.find_by_author_id(id)
  end

  def authored_replies

  end
end

class Question
  attr_accessor :title, :body

  def self.all
    data = QuestionsDatabase.instance.execute("SELECT * FROM questions")
    data.map { |datum| Question.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @fname = options['title']
    @lname = options['body']
    @user_id = options['user_id']
  end

  def self.find_by_author_id(user_id)
    question = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        questions
      WHERE
        user_id = ?
    SQL
    return nil unless question.length > 0

    Question.new(question.first)
  end

  def author
    @user_id
  end
end

class Reply
  attr_accessor :body

  def self.all
    data = QuestionsDatabase.instance.execute("SELECT * FROM Replies")
    data.map { |datum| Reply.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @body = options['body']
    @user_id = options['user_id']
    @question_id = options['question_id']
    @reply_id = options['reply_id']
  end

  def self.find_by_user_id(user_id)
    reply = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        Replies
      WHERE
        user_id = ?
    SQL
    return nil unless reply.length > 0

    Reply.new(reply.first)
  end

  def self.find_by_question_id(question_id)
    reply = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        Replies
      WHERE
        user_id = ?
    SQL
    return nil unless reply.length > 0

    Reply.new(reply.first)
  end

end

class QuestionFollow
  def self.all
    data = QuestionsDatabase.instance.execute("SELECT * FROM question_likes")
    data.map { |datum| QuestionFollow.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end

  def self.followers_for_question_id(question_id)
    follower = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        users.*
      FROM
        question_likes
      JOIN
        users
      ON
        question_likes.user_id = users.id
      WHERE
        question_id = ?
    SQL
    return nil unless follower.length > 0

    follower.map { |follow| User.new(follow) }
  end

end
